from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from datetime import datetime
import json
from pydantic import BaseModel
from ..database import db
from ...ai.scripts.predict import predict_new_loan, model, label_encoders, columns

router = APIRouter()


class Conversation(BaseModel):
    user_uid: str
    user_data: dict
    assistant: str


@router.get("/conversation/get/{conv_uid}")
async def get_conversation(conv_uid: str):
    conversation_with_messages = {}
    doc_ref = db.collection(u'conversations').document(conv_uid)
    doc = doc_ref.get()

    if doc.exists:
        conversation_with_messages["conversation_info"] = doc.to_dict()
        conversation_with_messages["conversation_info"]["conv_id"] = doc.id
        messages_ref = db.collection(u'messages').where(u'conversation_uid', u'==', conv_uid).order_by(
            u'created_at').get()
        conversation_with_messages["messages"] = [message.to_dict() for message in messages_ref]
        return conversation_with_messages
    else:
        return {"message": "Conversation not found"}


@router.get("/conversation/get_all/{user_uid}")
async def get_all(user_uid: str):
    user_conversations_with_messages = []
    conversations_ref = db.collection(u'conversations').where(u'user_uid', u'==', user_uid).get()
    for conversation in conversations_ref:
        conv_id = conversation.id
        conversation_with_messages = {
            "conversation_id": conv_id,
            "conversation_info": conversation.to_dict(),
            "messages": []
        }
        messages_ref = db.collection(u'messages').where(u'conversation_uid', u'==', conv_id).order_by(
            u'created_at').get()
        for message in messages_ref:
            conversation_with_messages["messages"].append(message.to_dict())
        user_conversations_with_messages.append(conversation_with_messages)
    return user_conversations_with_messages


@router.post("/conversation/create")
async def create_conversation(
        additional_data: UploadFile = File(...),
        user_data: UploadFile = File(...)
):
    if additional_data.content_type != "application/json" or user_data.content_type != "application/json":
        raise HTTPException(status_code=400, detail="Invalid file type")

    additional_contents = await additional_data.read()
    try:
        additional_dict = json.loads(additional_contents)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format in additional_data")

    user_contents = await user_data.read()
    try:
        user_dict = json.loads(user_contents)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format in user_data")

    combined_data = {
        "user_uid": additional_dict["user_uid"],
        "assistant": additional_dict["assistant"],
        "user_data": user_dict
    }

    conv = Conversation(**combined_data)

    data = {
        "user_uid": conv.user_uid,
        "user_data": conv.user_data,
        "assistant": conv.assistant,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    doc_ref_tuple = db.collection(u'conversations').add(data)
    doc_ref = doc_ref_tuple[1]
    doc_id = doc_ref.id

    prediction = predict_new_loan(user_dict, model, label_encoders, columns)
    print(prediction)

    content = "After analysing your information, we regret to inform you that your request has been refused."
    if prediction == 'Accepted':
        content = "After analysing your information, we are pleased to inform you that your request has been accepted."

    response = {
        "content": content,
        "conversation_uid": doc_id,
        "created_at": datetime.utcnow(),
        "isBot": True,
        "updated_at": datetime.utcnow()
    }
    db.collection(u'messages').add(response)

    return JSONResponse(content={"message": "Conversation created", "id": doc_id}, status_code=201,
                        headers={"Access-Control-Allow-Origin": "*"})
