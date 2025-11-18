from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest, ChatResponse, ConversationCreate, MessageCreate
from chat_logic import generate_reply
import chat_storage as store

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Conversation Endpoints
# -----------------------------
@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/conversations/{user_id}")
def get_conversations(user_id: str):
    return store.get_conversations(user_id)


@app.post("/api/conversations")
def create_conversation(payload: ConversationCreate):
    return store.create_conversation(payload.userId, payload.title)


@app.delete("/api/conversations/{conv_id}")
def delete_conversation(conv_id: str):
    store.delete_conversation(conv_id)
    return {"success": True}


# -----------------------------
# Messages Endpoints
# -----------------------------


@app.get("/api/messages/{conv_id}")
def get_msgs(conv_id: str):
    return store.get_messages(conv_id)


@app.post("/api/messages")
def send_message(payload: MessageCreate):
    # save user message
    user_msg = store.add_message(
        payload.conversationId, payload.content, payload.sender
    )

    # bot reply
    bot_reply_text = generate_reply(payload.content)
    bot_msg = store.add_message(payload.conversationId, bot_reply_text, "bot")

    return {"success": True, "botReply": bot_reply_text}
