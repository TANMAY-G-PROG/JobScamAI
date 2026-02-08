# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from transformers import BertTokenizer, BertForSequenceClassification
# import torch
# import fitz
# from lime.lime_text import LimeTextExplainer
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# tokenizer = BertTokenizer.from_pretrained("scam_detector_model")
# model = BertForSequenceClassification.from_pretrained("scam_detector_model", output_attentions=True)
# model.eval()

# explainer = LimeTextExplainer(class_names=["Legit", "Scam"])

# def predict(text):
#     inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
#     outputs = model(**inputs)
#     probs = torch.softmax(outputs.logits, dim=1)
#     return probs[0][1].item()

# def fraud_intelligence_engine(text):
#     t = text.lower()

#     score = 0
#     signals = []

#     payment_words = ["fee", "payment", "transfer", "deposit", "processing fee", "registration fee"]
#     if any(w in t for w in payment_words):
#         score += 25
#         signals.append(("Payment request detected", "HIGH"))

#     urgency_words = ["urgent", "immediately", "within 24 hours", "act fast", "limited time"]
#     if any(w in t for w in urgency_words):
#         score += 15
#         signals.append(("Urgency pressure language", "MEDIUM"))

#     if "selected" in t and "interview" not in t:
#         score += 20
#         signals.append(("Selected without interview", "HIGH"))

#     if "₹" in t or "lakh" in t or "per month" in t:
#         score += 15
#         signals.append(("Unrealistic salary pattern", "MEDIUM"))

#     generic_hr = ["congratulations", "dear candidate", "we are pleased"]
#     if any(w in t for w in generic_hr):
#         score += 10
#         signals.append(("Generic HR template language", "LOW"))

#     if "gmail.com" in t or "yahoo.com" in t or "outlook.com" in t:
#         score += 10
#         signals.append(("Non-corporate email domain", "MEDIUM"))

#     if "telegram" in t or "whatsapp" in t:
#         score += 20
#         signals.append(("Moves conversation off-platform", "HIGH"))

#     return score, signals

# @app.route("/predict", methods=["POST"])
# def detect():
#     data = request.json
#     text = data["text"]

#     score_ai = predict(text)
#     risk_score, signals = fraud_intelligence_engine(text)

#     final_score = min(100, round(score_ai*100 * 0.6 + risk_score * 0.4, 2))

#     return jsonify({
#         "is_scam": final_score > 50,
#         "scam_probability": final_score,
#         "signals": signals,
#         "confidence": "HIGH" if final_score > 75 else "MEDIUM" if final_score > 40 else "LOW"
#     })

# @app.route("/upload_pdf", methods=["POST"])
# def upload_pdf():
#     file = request.files["file"]

#     doc = fitz.open(stream=file.read(), filetype="pdf")
#     text = ""
#     for page in doc:
#         text += page.get_text()

#     score_ai = predict(text)
#     risk_score, signals = fraud_intelligence_engine(text)

#     final_score = min(100, round(score_ai*100 * 0.6 + risk_score * 0.4, 2))

#     return jsonify({
#         "is_scam": final_score > 50,
#         "scam_probability": final_score,
#         "signals": signals,
#         "confidence": "HIGH" if final_score > 75 else "MEDIUM" if final_score > 40 else "LOW"
#     })



# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import fitz
from lime.lime_text import LimeTextExplainer
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# -----------------------------
# AUTO MODEL DOWNLOAD (FOR DEPLOYMENT)
# -----------------------------
MODEL_DIR = "scam_detector_model"

if not os.path.exists(MODEL_DIR):
    print("Model not found. Downloading...")
    import download_model

# -----------------------------
# LOAD MODEL
# -----------------------------
tokenizer = BertTokenizer.from_pretrained(MODEL_DIR)
model = BertForSequenceClassification.from_pretrained(MODEL_DIR, output_attentions=True)
model.eval()

explainer = LimeTextExplainer(class_names=["Legit", "Scam"])


# -----------------------------
# AI PREDICTION
# -----------------------------
def predict(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    probs = torch.softmax(outputs.logits, dim=1)
    return probs[0][1].item()


# -----------------------------
# RULE-BASED FRAUD ENGINE
# -----------------------------
def fraud_intelligence_engine(text):
    t = text.lower()

    score = 0
    signals = []

    # 💰 PAYMENT SIGNAL
    payment_words = ["fee", "payment", "transfer", "deposit", "processing fee", "registration fee"]
    if any(w in t for w in payment_words):
        score += 25
        signals.append(("Payment request detected", "HIGH"))

    # ⚡ URGENCY
    urgency_words = ["urgent", "immediately", "within 24 hours", "act fast", "limited time"]
    if any(w in t for w in urgency_words):
        score += 15
        signals.append(("Urgency pressure language", "MEDIUM"))

    # 🎯 NO INTERVIEW
    if "selected" in t and "interview" not in t:
        score += 20
        signals.append(("Selected without interview", "HIGH"))

    # 💸 SALARY PATTERN
    if "₹" in t or "lakh" in t or "per month" in t:
        score += 15
        signals.append(("Unrealistic salary pattern", "MEDIUM"))

    # 🧾 GENERIC HR TEMPLATE
    generic_hr = ["congratulations", "dear candidate", "we are pleased"]
    if any(w in t for w in generic_hr):
        score += 10
        signals.append(("Generic HR template language", "LOW"))

    # 📧 FREE EMAIL DOMAIN
    if "gmail.com" in t or "yahoo.com" in t or "outlook.com" in t:
        score += 10
        signals.append(("Non-corporate email domain", "MEDIUM"))

    # 📱 OFF-PLATFORM CONTACT
    if "telegram" in t or "whatsapp" in t:
        score += 20
        signals.append(("Moves conversation off-platform", "HIGH"))

    return score, signals


# -----------------------------
# TEXT ENDPOINT
# -----------------------------
@app.route("/predict", methods=["POST"])
def detect():
    data = request.json
    text = data["text"]

    score_ai = predict(text)
    risk_score, signals = fraud_intelligence_engine(text)

    final_score = min(100, round(score_ai * 100 * 0.6 + risk_score * 0.4, 2))

    return jsonify({
        "is_scam": final_score > 50,
        "scam_probability": final_score,
        "signals": signals,
        "confidence": "HIGH" if final_score > 75 else "MEDIUM" if final_score > 40 else "LOW"
    })


# -----------------------------
# PDF ENDPOINT
# -----------------------------
@app.route("/upload_pdf", methods=["POST"])
def upload_pdf():
    file = request.files["file"]

    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()

    score_ai = predict(text)
    risk_score, signals = fraud_intelligence_engine(text)

    final_score = min(100, round(score_ai * 100 * 0.6 + risk_score * 0.4, 2))

    return jsonify({
        "is_scam": final_score > 50,
        "scam_probability": final_score,
        "signals": signals,
        "confidence": "HIGH" if final_score > 75 else "MEDIUM" if final_score > 40 else "LOW"
    })


# -----------------------------
# HEALTH CHECK (IMPORTANT FOR RENDER)
# -----------------------------
@app.route("/")
def home():
    return "Job Scam Detection API is running!"


# -----------------------------
# START SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
