from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ChatRequest(BaseModel):
    user_email: str
    message: str


class ChatResponse(BaseModel):
    reply: str


class ConversationCreate(BaseModel):
    userId: str
    title: str


class Conversation(BaseModel):
    id: str
    userId: str
    title: str
    updatedAt: datetime


class MessageCreate(BaseModel):
    conversationId: str
    content: str
    sender: str  # "user" or "bot"


class Message(BaseModel):
    id: str
    conversationId: str
    content: str
    sender: str
    createdAt: datetime
