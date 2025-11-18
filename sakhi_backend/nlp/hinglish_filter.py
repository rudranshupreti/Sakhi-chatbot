import os
import re
from dotenv import load_dotenv
from openai import OpenAI
from langdetect import detect

# Load .env
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Language check
def is_hinglish(text):
    try:
        lang = detect(text)
        print(f"Detected language: {lang}")

        # Check common Hinglish keywords
        if any(
            word in text.lower()
            for word in [
                "mujhe",
                "hai",
                "nahi",
                "karna",
                "kaise",
                "kya",
                "kyu",
                "mein",
                "tum",
                "aap",
                "yoga",
            ]
        ):
            return "hinglish"
        return "english"
    except Exception as e:
        print(f"[⚠️ langdetect error]: {str(e)}")
        return "english"


# Text cleaner for Hinglish
def clean_hinglish(text):
    text = text.lower().strip()
    text = re.sub(r"(.)\1{2,}", r"\1", text)  # remove char repetition
    text = re.sub(r"[^a-zA-Z0-9\s,.!?]", "", text)  # remove non-text chars
    return text


# GPT translator
def gpt_translate(text):
    try:
        gpt_response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a translator that converts Hinglish (Hindi-English in Roman script) into clean, fluent English. "
                        "Correct spelling, remove repetition, and avoid literal translation errors."
                    ),
                },
                {"role": "user", "content": text},
            ],
            temperature=0.1,
            max_tokens=150,
        )

        return {
            "raw_input": text,
            "translated_input": gpt_response.choices[0].message.content.strip(),
            "model_used": gpt_response.model,
        }

    except Exception as e:
        return {"error": f"Translation failed: {str(e)}"}


# Final main handler
def filter_hinglish(text):
    lang = is_hinglish(text)

    if lang == "hinglish":
        cleaned = clean_hinglish(text)
        return gpt_translate(cleaned)

    return {
        "raw_input": text,
        "translated_input": text,
        "model_used": "bypass (pure english)",
    }
