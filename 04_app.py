from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = (
    "You are TECHNOVA AI, a helpful assistant for the TECHNOVA website. "
    "TECHNOVA is a technology practice project focused on AI, web development, "
    "and creative digital solutions. "
    "Projects include: AI Nexus (AI assistant) and StudySphere (student productivity platform). "
    "Team: Aarav Sharma (Frontend), Riya Patel (AI), Dev Mehta (Backend), "
    "Ananya Shah (UI/UX), Karan Joshi (Project Developer). "
    "This is a learning project, not a real company. "
    "Be friendly, concise, and helpful. Keep replies short and conversational."
)

chat_history = [{"role": "system", "content": SYSTEM_PROMPT}]

@app.route("/chat", methods=["POST"])
def chat():
    global chat_history
    try:
        msg = request.json.get("message", "").strip()
        if not msg:
            return jsonify({"reply": "Please send a message."}), 400

        chat_history.append({"role": "user", "content": msg})

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=chat_history,
            max_tokens=500,
        )

        reply = response.choices[0].message.content
        chat_history.append({"role": "assistant", "content": reply})

        return jsonify({"reply": reply})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"reply": "Sorry, something went wrong. Please try again."}), 500


if __name__ == "__main__":
    app.run(debug=True)
