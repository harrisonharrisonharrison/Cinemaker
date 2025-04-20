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


@app.route("/api/chat", methods=["POST"])
def chat():
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Explain how AI works in a few words"
    )
    try:
        print(response.text)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
