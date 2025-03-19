from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
from backend.api.database import db
from backend.api.message.generate_message import random_message

router = APIRouter()


@router.post("/message/create")
async def create_message(conv_uid: str, content: str):
    user_data = {
        "content": content,
        "conversation_uid": conv_uid,
        "created_at": datetime.utcnow(),
        "isBot": False,
        "updated_at": datetime.utcnow()
    }

    bot_response = random_message(1)
    bot_data = {
        "content": bot_response,
        "conversation_uid": conv_uid,
        "created_at": datetime.utcnow(),
        "isBot": True,
        "updated_at": datetime.utcnow()
    }

    doc_ref_user_tuple = db.collection(u'messages').add(user_data)
    doc_ref_bot_tuple = db.collection(u'messages').add(bot_data)

    conversation_ref = db.collection(u'conversations').document(conv_uid)
    conversation_data = conversation_ref.get().to_dict()
    conversation_data["updated_at"] = datetime.utcnow()
    conversation_ref.set(conversation_data)

    return JSONResponse(content={"user_message": content, "bot_response": bot_response}, status_code=201,
                        headers={"Access-Control-Allow-Origin": "*"})
