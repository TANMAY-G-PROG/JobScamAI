# 🚨 JobScamAI - Intelligent Job Scam Detection System

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.9+-blue)
![React](https://img.shields.io/badge/React-19.2+-blue)
![Status](https://img.shields.io/badge/Status-Active%20Development-yellow)

**An AI-powered system that detects job scams using machine learning and intelligent rule-based analysis. Analyze job offers via text input or PDF upload to identify fraudulent patterns.**

[Live Demo](#-live-demo) • [Features](#-key-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation)

</div>

## 🎯 Overview

**JobScamAI** is an intelligent detection system designed to help job seekers identify fraudulent job offers before engaging with scammers. It combines:

- **AI-Powered Detection** (60% weight): BERT-based deep learning model trained on job scam datasets
- **Rule-Based Fraud Engine** (40% weight): Domain-specific heuristics detecting known scam patterns
- **Multi-Modal Input**: Analyze job offers via direct text or PDF uploads
- **Explainable Results**: Understand exactly which fraud signals triggered the alert

### Why JobScamAI?

Job scams cost victims **$1B+ annually** in wasted time, personal information, and money. Most job seekers lack the tools to quickly verify job legitimacy. JobScamAI democratizes scam detection with:

✅ **Instant Analysis** - Get results in <2 seconds  
✅ **High Accuracy** - Hybrid AI + rule-based approach  
✅ **Transparent Scoring** - See exactly why an offer is flagged  
✅ **Completely Free** - No signup required  
✅ **Privacy-Focused** - No data stored or shared  

---

## ✨ Key Features

### 🤖 AI-Powered Detection
- **BERT Model**: State-of-the-art transformer model trained on job scam patterns
- **Deep Learning**: Contextual understanding of job offer language
- **Transfer Learning**: Leverages pre-trained language knowledge

### 📋 Multi-Modal Input
- **Text Input**: Paste job offer text directly
- **PDF Upload**: Extract and analyze job offer PDFs automatically
- **File Validation**: Automatic format detection and error handling

### 🎯 Fraud Signal Detection
Detects 7 critical fraud patterns:
- 💰 Payment requests (fees, deposits, processing charges)
- ⚡ Urgency pressure tactics
- 🎯 Unrealistic hiring shortcuts (selected without interview)
- 💸 Unrealistic salary promises
- 🧾 Generic HR template language
- 📧 Non-corporate email domains
- 📱 Off-platform communication requests

### 📊 Explainable Results
- **Confidence Levels**: HIGH, MEDIUM, or LOW
- **Risk Breakdown**: View individual fraud signals triggered
- **Hybrid Scoring**: Transparency on AI vs. rule-based components
- **Actionable Insights**: Clear reasons for flagging

### 🚀 Production-Ready
- **Containerized**: Docker support for easy deployment
- **Scalable API**: RESTful endpoints with CORS support
- **Health Checks**: Monitoring endpoints for uptime verification
- **Error Handling**: Comprehensive exception management

---

## 🛠 Technology Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Flask | 3.1.2 |
| **ML Model** | BERT (Transformers) | 5.0.0 |
| **Deep Learning** | PyTorch | 2.10.0 |
| **PDF Processing** | PyMuPDF | 1.26.7 |
| **Model Explanability** | LIME | 0.2.0.1 |
| **CORS Support** | Flask-CORS | 6.0.2 |
| **Environment** | Python | 3.9+ |

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React | 19.2 |
| **Build Tool** | Vite | 7.2.4 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **HTTP Client** | Axios | 1.13.4 |
| **Linting** | ESLint | 9.39.1 |

### DevOps & Deployment
| Component | Technology |
|-----------|-----------|
| **Containerization** | Docker |
| **Hosting** | Render, Heroku, AWS, etc. |
| **Process Manager** | Gunicorn (Production) |

---

## 🏗 Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components: Upload, TextInput, Results, Dashboard   │   │
│  │  Styling: Tailwind CSS                               │   │
│  │  API Communication: Axios                            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ (HTTP/REST)
┌─────────────────────────────────────────────────────────────┐
│                  Backend API (Flask + Python)               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  /predict (POST)        → Text Analysis              │   │
│  │  /upload_pdf (POST)     → PDF Analysis               │   │
│  │  / (GET)                → Health Check               │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  BERT Model Inference Engine                         │   │
│  │  Rule-Based Fraud Detection Engine                   │   │
│  │  LIME Explainability                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    ML Models & Assets                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  BERT Tokenizer (scam_detector_model/)               │   │
│  │  BERT Classifier (scam_detector_model/)              │   │
│  │  Auto-download from Google Drive on first run        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Prerequisites

### System Requirements
- **OS**: Linux, macOS, or Windows (WSL2 recommended)
- **RAM**: 4GB minimum (8GB recommended for ML model)
- **Disk Space**: 2GB available (for model downloads)
- **Internet**: Required for first-time model download

### Software Requirements

**Python (Backend)**
```bash
Python 3.9, 3.10, 3.11, or 3.12
pip (Python package manager)
venv (virtual environment) - included with Python
```

**Node.js (Frontend)**
```bash
Node.js 18+ 
npm 9+ (comes with Node.js)
```

### Verification Commands
```bash
# Check Python
python --version
python3 --version

# Check pip
pip --version
pip3 --version

# Check Node.js
node --version
npm --version
```

---

## 🚀 Installation

### Backend Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/TANMAY-G-PROG/JobScamAI.git
cd JobScamAI
```

#### Step 2: Create Virtual Environment
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows (Command Prompt):
venv\Scripts\activate

# On Windows (PowerShell):
venv\Scripts\Activate.ps1
```

**Verify activation**: Your terminal prompt should show `(venv)` prefix

#### Step 3: Install Backend Dependencies
```bash
cd backend

# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt
```

**Expected output**: All packages installed successfully without errors

#### Step 4: Verify Backend Installation
```bash
# Test imports
python -c "import torch; import transformers; import flask; print('✓ All dependencies installed')"
```

### Frontend Setup

#### Step 1: Navigate to Frontend Directory
```bash
# From project root
cd frontend
```

#### Step 2: Install Frontend Dependencies
```bash
npm install
```

**Expected output**: Packages installed, node_modules folder created

#### Step 3: Verify Frontend Installation
```bash
npm run lint
```

**Expected output**: ESLint runs without critical errors

---

## ⚙️ Configuration

### Backend Configuration

#### Environment Variables
Create a `.env` file in the `backend/` directory:

```bash
# backend/.env

# Flask Configuration
FLASK_ENV=development        # development or production
FLASK_DEBUG=True             # Set to False in production
SECRET_KEY=your-secret-key-here

# Model Configuration
MODEL_DIR=scam_detector_model
MODEL_AUTO_DOWNLOAD=True     # Auto-download model on startup

# Server Configuration
HOST=0.0.0.0                # 0.0.0.0 for docker, 127.0.0.1 for local
PORT=5000
MAX_CONTENT_LENGTH=50000000  # Max file upload size in bytes (50MB)

# CORS Configuration
CORS_ORIGINS=*               # Restrict in production: http://localhost:3000

# Logging
LOG_LEVEL=DEBUG              # DEBUG, INFO, WARNING, ERROR
```

#### Loading Environment Variables
```python
# In app.py (already configured)
from dotenv import load_dotenv
import os

load_dotenv()  # Loads .env file
```

**Install python-dotenv if needed:**
```bash
pip install python-dotenv
```

### Frontend Configuration

#### Environment Variables
Create a `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local

# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

# Application Settings
VITE_APP_NAME=JobScamAI
VITE_MAX_FILE_SIZE=50000000  # 50MB
```

#### Accessing Environment Variables in React
```javascript
// In React components
const API_URL = import.meta.env.VITE_API_URL;
const MAX_FILE_SIZE = import.meta.env.VITE_MAX_FILE_SIZE;
```

---

## 🎮 Usage

### Running Locally

#### Option 1: Development Mode (Recommended for Development)

**Terminal 1: Start Backend**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

**Expected output:**
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
Press CTRL+C to quit
```

**Terminal 2: Start Frontend**
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v7.2.4  ready in 245 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

**Access the application**: Open `http://localhost:5173` in your browser

#### Option 2: Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Backend (Production):**
```bash
cd backend
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```
---

### Step-by-Step Process

#### 1. **Text Preprocessing**
```python
1. Convert text to lowercase
2. Remove extra whitespace
3. Handle encoding issues
4. Truncate to max tokens (512 for BERT)
```

#### 2. **AI Prediction (BERT Model)**
```python
1. Tokenize input text using BERT tokenizer
2. Generate token embeddings
3. Pass through BERT transformer layers
4. Extract classification logits
5. Apply softmax to get probability
6. Return probability of "Scam" class
```

**Model Details:**
- **Architecture**: BERT-base (12 layers, 768 hidden units)
- **Training Data**: ~10,000 labeled job offer examples
- **Tokenizer**: WordPiece (vocabulary size: 30,522)
- **Max Sequence Length**: 512 tokens

#### 3. **Rule-Based Analysis (Fraud Engine)**
```python
1. Check for payment-related keywords
2. Detect urgency pressure language
3. Identify unrealistic hiring shortcuts
4. Analyze salary patterns
5. Identify generic HR templates
6. Check for non-corporate emails
7. Detect off-platform communication requests
8. Sum all detected signals
```

#### 4. **Result Aggregation**
```python
1. Combine AI and rule scores
2. Calculate final probability (0-100)
3. Assign confidence level
4. Return signals for transparency
5. Format JSON response
```

### Fraud Signals

Each signal contributes a fixed point value to the rule-based score:

| # | Signal | Points | Risk | Detection Pattern |
|---|--------|--------|------|-------------------|
| 1 | Payment Request | 25 | HIGH | "fee", "payment", "transfer", "deposit" |
| 2 | Urgency Language | 15 | MEDIUM | "urgent", "immediately", "within 24 hours" |
| 3 | No Interview | 20 | HIGH | "selected" without "interview" |
| 4 | Salary Anomaly | 15 | MEDIUM | "₹", "lakh", "per month" |
| 5 | Generic Template | 10 | LOW | "congratulations", "dear candidate" |
| 6 | Free Email | 10 | MEDIUM | "@gmail.com", "@yahoo.com", "@outlook.com" |
| 7 | Off-Platform | 20 | HIGH | "telegram", "whatsapp" |

**Scoring Rules:**
- Minimum score: 0
- Maximum score: 100 (capped)
- Multiple detections of same signal: No duplication
- Final formula: `min(100, total_points)`

### Decision Thresholds

```
Score ≤ 25  → LOW confidence, likely legitimate
25 < Score < 50 → MEDIUM confidence, needs review
Score ≥ 50  → Flagged as potential scam
Score ≥ 75  → HIGH confidence scam alert
```

---

## 📁 File Structure

```
JobScamAI/
├── README.md                          # This file
├── .gitignore                         # Git ignore configuration
│
├── backend/
│   ├── app.py                         # Main Flask application
│   ├── download_model.py              # Automated model downloader
│   ├── requirements.txt               # Python dependencies
│   └── scam_detector_model/           # BERT model directory (auto-generated)
│       ├── config.json
│       ├── pytorch_model.bin
│       ├── tokenizer.json
│       ├── tokenizer_config.json
│       └── vocab.txt
│
├── frontend/
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── App.jsx                    # Main App component
│   │   ├── main.jsx                   # Entry point
│   │   ├── index.css                  # Global styles
│   │   ├── components/                # React components
│   │   │   ├── TextAnalyzer.jsx       # Text input form
│   │   │   ├── PDFUploader.jsx        # PDF upload handler
│   │   │   ├── ResultsDisplay.jsx     # Results UI
│   │   │   └── Header.jsx             # Header component
│   │   └── utils/
│   │       ├── api.js                 # API calls
│   │       └── constants.js           # Constants
│   ├── index.html                     # HTML entry point
│   ├── package.json                   # NPM dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   └── eslint.config.js               # ESLint configuration
│
└── .env.example                       # Example environment variables
```
---

#### Step 4: Deploy
- Click "Create Web Service"
- Wait for build and deployment (5-10 minutes)
- Copy deployment URL

---

### Heroku Deployment

#### Step 1: Create `Procfile`
```
web: cd backend && gunicorn -w 4 -b 0.0.0.0:$PORT app:app
```

#### Step 2: Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create jobscamai-api

# Set buildpacks
heroku buildpacks:add heroku/python --index 1

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**MIT License Summary:**
- ✅ Use for commercial purposes
- ✅ Modify and distribute
- ✅ Private use
- ❌ Hold liable
- ❌ Warranty provided

---

## 📧 Contact

### Project Maintainer
- **Name**: Tanmay G Shetty
- **GitHub**: [@TANMAY-G-PROG](https://github.com/TANMAY-G-PROG)
- **Email**: tanmay.121cr7@gmail.com

### Support & Questions
- **Issues**: [GitHub Issues](https://github.com/TANMAY-G-PROG/JobScamAI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TANMAY-G-PROG/JobScamAI/discussions)
- **Email**: tanmay.121cr7@gmail.com

## 🙏 Acknowledgments

- **BERT Model**: [HuggingFace Transformers](https://huggingface.co/transformers/)
- **Flask Framework**: [Flask Documentation](https://flask.palletsprojects.com/)
- **React**: [React Official Docs](https://react.dev/)
- **Vite**: [Vite Documentation](https://vitejs.dev/)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/)

---

## 📊 Project Statistics

- **Total Lines of Code**: ~2,000+
- **Test Coverage**: In progress
- **Active Contributors**: 1
- **Last Updated**: February 2026
- **Repository Size**: 41 KB

---

## ⭐ Show Your Support

If you find JobScamAI helpful, please:
- ⭐ **Star** this repository
- 🍴 **Fork** to use in your projects
- 📢 **Share** with others
- 🐛 **Report bugs** to help improve
- 💡 **Suggest features** for improvements

---

<div align="center">

**Made with ❤️ by [Tanmay G Shetty](https://github.com/TANMAY-G-PROG)**

**[⬆ Back to Top](#-jobscamai---intelligent-job-scam-detection-system)**

</div>
