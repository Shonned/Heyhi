from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
from ..database import db

router = APIRouter()


@router.post("/message/create")
async def create_message(conv_uid: str, content: str):
    data = {
        "content": content,
        "conversation_uid": conv_uid,
        "created_at": datetime.utcnow(),
        "isBot": False,
        "updated_at": datetime.utcnow()
    }
    doc_ref_tuple = db.collection(u'messages').add(data)
    doc_ref = doc_ref_tuple[1]

    return JSONResponse(content={"message": "Message created", "content": content}, status_code=201,
                        headers={"Access-Control-Allow-Origin": "*"})
