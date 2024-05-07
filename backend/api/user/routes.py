from fastapi import APIRouter
from ..database import db

router = APIRouter()

@router.get("/user/{user_id}")
async def get_user(user_id: str):
    doc_ref = db.collection(u'users').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"message": "Document does not exist"}