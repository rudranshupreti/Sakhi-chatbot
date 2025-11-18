import axios from "axios";

const API_URL = "http://localhost:8000/chat";

export async function sendChatMessage(userEmail: string, message: string) {
  const res = await axios.post(API_URL, {
    user_email: userEmail,
    message: message,
  });

  return res.data.reply;
}
