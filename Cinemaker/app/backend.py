# backend.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

real_api_key = os.getenv('API_KEY') 

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=real_api_key)

title = "The Last of Us"

@app.route("/api/title", methods=["POST"])
def set_title():
    data = request.get_json()
    title = data.get("title", "")
    print(title)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=f"Tell me what the show/movie {title} is about in a few words"
    )
    print(response.text)
    return jsonify({"response": response.text})

@app.route("/api/chat", methods=["POST"])
def chat():
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=f"Tell me what the show/movie {title} is about in a few words"
    )
    print(response.text)
    return jsonify({"response": response.text})


if __name__ == "__main__":
    app.run(debug=True, port=4999)
