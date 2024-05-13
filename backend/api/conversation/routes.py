from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime

from pydantic import BaseModel

from ..database import db

router = APIRouter()

class Conversation(BaseModel):
    user_uid: str


@router.get("/conversation/get/{conv_uid}")
async def get_conversation(conv_uid: str):
    conversation_with_messages = {}
    doc_ref = db.collection(u'conversations').document(conv_uid)
    doc = doc_ref.get()

    if doc.exists:
        conversation_with_messages["conversation_info"] = doc.to_dict()
        conversation_with_messages["conversation_info"]["conv_id"] = doc.id
        messages_ref = db.collection(u'messages').where(u'conversation_uid', u'==', conv_uid).order_by(u'created_at').get()
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
        messages_ref = db.collection(u'messages').where(u'conversation_uid', u'==', conv_id).order_by(u'created_at').get()
        for message in messages_ref:
            conversation_with_messages["messages"].append(message.to_dict())
        user_conversations_with_messages.append(conversation_with_messages)
    return user_conversations_with_messages



@router.post("/conversation/create")
async def create_conversation(conv: Conversation):
    data = {
        "user_uid": conv.user_uid,
        "assistant": "default",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    doc_ref_tuple = db.collection(u'conversations').add(data)
    doc_ref = doc_ref_tuple[1]
    doc_id = doc_ref.id
    return JSONResponse(content={"message": "Conversation created", "id": doc_id}, status_code=201,
                        headers={"Access-Control-Allow-Origin": "*"})
