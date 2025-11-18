from datetime import datetime
import uuid
from supabase_client import supabase


def create_conversation(user_id: str, title: str):
    conv_id = str(uuid.uuid4())

    result = (
        supabase.table("conversations")
        .insert(
            {
                "id": conv_id,
                "user_id": user_id,
                "title": title,
                "updated_at": datetime.utcnow(),
            }
        )
        .execute()
    )

    return result.data[0]


def get_conversations(user_id: str):
    result = (
        supabase.table("conversations")
        .select("*")
        .eq("user_id", user_id)
        .order("updated_at", desc=True)
        .execute()
    )

    return result.data


def delete_conversation(conv_id: str):
    supabase.table("messages").delete().eq("conversation_id", conv_id).execute()
    supabase.table("conversations").delete().eq("id", conv_id).execute()

    return {"status": "deleted"}


def add_message(conv_id: str, content: str, sender: str):
    msg_id = str(uuid.uuid4())

    result = (
        supabase.table("messages")
        .insert(
            {
                "id": msg_id,
                "conversation_id": conv_id,
                "content": content,
                "sender": sender,
                "created_at": datetime.utcnow(),
            }
        )
        .execute()
    )

    # Update conversation last updated time
    supabase.table("conversations").update({"updated_at": datetime.utcnow()}).eq(
        "id", conv_id
    ).execute()

    return result.data[0]


def get_messages(conv_id: str):
    result = (
        supabase.table("messages")
        .select("*")
        .eq("conversation_id", conv_id)
        .order("created_at", desc=False)
        .execute()
    )

    return result.data
