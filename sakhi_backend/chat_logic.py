from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
from dotenv import load_dotenv

# ✅ Load the .env from the same folder where this file exists
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

# ✅ Get the API key
openai_key = os.getenv("OPENAI_API_KEY")

# Debug print to confirm
print(
    "OPENAI_API_KEY loaded:", openai_key[:5] + "..." if openai_key else "❌ NOT FOUND"
)

# ✅ Use the Chat Model
chat_model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.4, api_key=openai_key)

# Prompt Template
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are Sakhi, a caring and empathetic yoga and wellness guide for Indian women. Reply in Hinglish with emotional warmth.",
        ),
        ("user", "{message}"),
    ]
)

# Output parser
output_parser = StrOutputParser()

# Chain
chain = prompt | chat_model | output_parser


def generate_reply(message: str) -> str:
    try:
        return chain.invoke({"message": message})
    except Exception as e:
        print("Error from LangChain ChatModel:", e)
        return "😔 Sakhi abhi thoda confuse ho gayi, baad me try karna."
