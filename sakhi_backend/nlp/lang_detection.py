from langdetect import detect


def is_hinglish(text):
    hinglish_words = [
        "kya",
        "hai",
        "tum",
        "aap",
        "kaise",
        "theek",
        "acha",
        "bhi",
        "nahi",
        "haina",
        "kahan",
        "batao",
        "samajh",
        "koi",
        "chahiye",
        "mujhe",
        "karna",
        "class",
        "pata nahi",
        "nahi chahiye",
        "mujhe lagta",
        "kya karu",
    ]

    text_lower = text.lower()

    try:
        lang = detect(text)
    except:
        lang = "en"

    hinglish_count = sum(1 for word in hinglish_words if word in text_lower)

    if lang == "en" and hinglish_count >= 2:
        return "hinglish"
    elif lang == "en":
        return "english"
    else:
        return lang
