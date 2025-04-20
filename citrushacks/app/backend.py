# backend.py
import os

from google import genai
from dotenv import load_dotenv, find_dotenv

# Load your API key from the environment

load_dotenv(find_dotenv())

real_api_key = os.getenv('API_KEY')  # Make sure you set GEMINI_API_KEY in your .env or shell

client = genai.Client(api_key=real_api_key)

response = client.models.generate_content(
    model="gemini-2.0-flash",          # or "gemini-2.5-flash"
    contents="How does AI work?"       # simple string works for text generation
)
print(response.text)
