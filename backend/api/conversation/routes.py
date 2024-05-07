from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
from ..database import db

router = APIRouter()


@router.get("/conversation/get/{conv_uid}")
async def get_user(conv_uid: str):
    doc_ref = db.collection(u'conversations').document(conv_uid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"message": "Document does not exist"}


@router.post("/conversation/create")
async def create_conversation(user_uid: str):
    data = {
        "user_uid": user_uid,
        "assistant": "default",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    doc_ref_tuple = db.collection(u'conversations').add(data)
    doc_ref = doc_ref_tuple[1]
    doc_id = doc_ref.id
    return JSONResponse(content={"message": "Conversation created", "id": doc_id}, status_code=201,
                        headers={"Access-Control-Allow-Origin": "*"})
