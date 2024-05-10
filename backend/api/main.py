from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .conversation.routes import router as conversation_router
from .user.routes import router as users_router
from .message.routes import router as message_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conversation_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(message_router, prefix="/api")
