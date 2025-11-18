from supabase import create_client
from dotenv import load_dotenv
import os

print(">>> Loading .env...")
load_dotenv()

print(">>> SUPABASE_URL =", os.getenv("SUPABASE_URL"))
print(">>> SUPABASE_KEY =", os.getenv("SUPABASE_KEY")[:20], "...")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("ENV NOT LOADED — .env path is wrong")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
