import os
from dotenv import load_dotenv
from openai import OpenAI
from english_filter import smart_text_filter
from hinglish_filter import filter_hinglish

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def gpt_detect_intent(text):
    prompt = f"""
You are an intent classifier for a women's yoga chatbot.

Choose the correct intent from:
- start_yoga
- ask_schedule
- ask_price
- greeting
- ask_benefits
- feedback
- gratitude
- not_sure

Message: "{text}"

Important:
- Do not classify as 'greeting' if deeper meaning exists.
- Only return the correct intent label. No explanation.
"""
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # ✅ FAST, GOOD FOR INTENT
        messages=[{"role": "user", "content": prompt}],
        max_tokens=20,
        temperature=0.1,
    )
    intent = response.choices[0].message.content.strip().lower()
    intent = intent.replace("intent:", "").strip()
    return intent


def process_user_input(text):
    # Step 1: Try Hinglish flow
    hinglish_result = filter_hinglish(text)
    if hinglish_result and "translated_input" in hinglish_result:
        intent = gpt_detect_intent(hinglish_result["translated_input"])
        hinglish_result["detected_intent"] = intent
        return hinglish_result

    # Step 2: Fallback to English flow
    cleaned = smart_text_filter(text)
    intent = gpt_detect_intent(cleaned)
    return {"raw_input": text, "translated_input": cleaned, "detected_intent": intent}


# ✅ Test Run
if __name__ == "__main__":
    user_input = input("👩‍🦰 User says: ")
    result = process_user_input(user_input)
    print(result)
