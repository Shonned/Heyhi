from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
from ..database import db

router = APIRouter()

@router.post("/conversation/create")
async def create_conversation(user_uid: int):
    print(f"User ID received: {user_uid}")
    return JSONResponse(content={"user_uid": user_uid}, status_code=201, headers={"Access-Control-Allow-Origin": "*"})
