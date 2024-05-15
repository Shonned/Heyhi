from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..database import db

router = APIRouter()


class UserUpdate(BaseModel):
    uid: str
    username: str


@router.put("/user/update")
async def update_user(user_update: UserUpdate):
    try:
        user_ref = db.collection('users').document(user_update.uid)
        user_ref.update({
            'username': user_update.username,
        })

        return {"message": "User updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating user: {e}")


@router.get("/user/{user_id}")
async def get_user(user_id: str):
    doc_ref = db.collection(u'users').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    else:
        return {"message": "Document does not exist"}
