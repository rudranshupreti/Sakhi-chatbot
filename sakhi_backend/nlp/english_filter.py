import os
import re
from symspellpy import SymSpell
import language_tool_python

# Setup SymSpell
sym_spell = SymSpell(max_dictionary_edit_distance=2)
dict_path = "sakhi backend/frequency_dictionary_en_82_765.txt"
if os.path.exists(dict_path):
    sym_spell.load_dictionary(dict_path, 0, 1)
else:
    raise FileNotFoundError(f"{dict_path} not found!")

# Setup LanguageTool
grammar_tool = language_tool_python.LanguageTool("en-IN")


# Step 1: Lowercase and strip extra spaces
def basic_cleanup(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip()).lower()


# Step 2: Remove emojis and special characters (keep .,!?)
def remove_noise(text: str) -> str:
    return re.sub(r"[^\w\s,.!?]", "", text)


# Step 3: Convert "hellooooo" to "helloo"
def reduce_repeated_chars(text: str) -> str:
    return re.sub(r"(.)\1{2,}", r"\1\1", text)


# Step 4: Spell correction using SymSpell
def correct_spelling(text: str) -> str:
    suggestions = sym_spell.lookup_compound(text, max_edit_distance=2)
    return suggestions[0].term if suggestions else text


# Step 5: Grammar correction using LanguageTool
def fix_grammar(text: str) -> str:
    return grammar_tool.correct(text)


# ✅ Final pipeline
def smart_text_filter(
    text: str, apply_grammar: bool = True, force_grammar: bool = False
) -> str:
    text = basic_cleanup(text)
    text = remove_noise(text)
    text = reduce_repeated_chars(text)
    text = correct_spelling(text)

    if apply_grammar and (force_grammar or len(text.split()) < 15):
        text = fix_grammar(text)

    return text
