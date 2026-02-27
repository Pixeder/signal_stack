# 🚀 SignalStack

> AI-Powered Tech Intelligence Platform  
> Extracting signal from noise in the developer ecosystem.

SignalStack is a full-stack AI-driven news intelligence platform that fetches, filters, ranks, and summarizes high-quality technology news from Hacker News.

It uses semantic embeddings and multi-factor ranking instead of simple keyword matching to deliver meaningful daily tech insights for developers and students.

---

## 🧠 Why SignalStack?

Hacker News contains valuable tech discussions — but also noise.

SignalStack solves this by:

- Automatically fetching new stories
- Filtering them using semantic relevance (AI embeddings)
- Ranking them using multi-factor scoring
- Generating a daily summarized tech digest
- Providing a clean UI to browse reports
- Allowing bookmarking of reports

It is built using a **microservices architecture** with Node.js + Python AI + Next.js.

---

## ✨ Features

- 🔄 Automated Hacker News Fetch (Cron-based)
- 🧠 Semantic Relevance Filtering (Sentence Transformers)
- 📊 Multi-factor Ranking Engine
- 🤖 AI-based Article Summarization
- 📅 Daily Tech Digest Generation
- 📚 Report History Page
- ⭐ Bookmark Reports
- ⚡ Microservice Architecture
- 🧩 Monorepo Setup

---

## 🏗️ Architecture

```
Client (Next.js - TypeScript)
        ↓
Node.js Backend (Express)
        ↓
Python AI Service (FastAPI + Transformers)
        ↓
MongoDB Atlas
```

### Microservices Breakdown

### 1️⃣ Backend (Node.js)
- Fetches Hacker News stories
- Applies filtering logic
- Calls AI service for embeddings
- Generates daily reports
- Exposes REST APIs

### 2️⃣ AI Service (Python)
- Generates sentence embeddings
- Computes semantic relevance
- (Future-ready for classification models)

### 3️⃣ Frontend (Next.js)
- Displays daily reports
- Shows report history
- Allows bookmarking
- Clean, modern UI

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- node-cron
- Axios

### AI Service
- Python
- FastAPI
- Sentence-Transformers
- HuggingFace Transformers
- PyTorch

### Frontend
- Next.js (TypeScript)
- Tailwind CSS
- Axios

---

## 🧠 AI Relevance Engine

Instead of keyword filtering, SignalStack uses semantic embeddings.

### Process:
1. Convert article text into vector embeddings
2. Compare with multiple tech-domain anchor vectors
3. Compute cosine similarity
4. Keep articles above threshold

### Tech Domains Covered:
- Artificial Intelligence
- Software Engineering
- Programming Languages
- DevOps & Cloud
- Cybersecurity
- Startups & SaaS
- Open Source
- Developer Tools

This ensures relevant tech content is selected even without matching exact keywords.

---

## 📊 Ranking Strategy

Each article is scored using:

- Semantic similarity score
- Hacker News score
- Domain credibility boost

Final ranking prioritizes high-quality technical discussions.

---

## 📂 Project Structure

```
project-root/
│
├── tech-newspaper-server/   # Node.js backend
├── tech-report-client/      # Next.js frontend
├── ai-service/              # Python AI microservice
└── README.md
```

---

## ⚙️ Setup Instructions

---

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd project-root
```

---

### 2️⃣ Backend Setup

```bash
cd tech-newspaper-server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
AI_SERVICE_URL=http://localhost:8000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ AI Service Setup

```bash
cd ai-service
python -m venv venv
```

Activate virtual environment:

**Windows**
```
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run AI service:

```bash
uvicorn app:app --port 8000
```

---

### 4️⃣ Frontend Setup

```bash
cd tech-report-client
npm install
npm run dev
```

---

## ⏰ Automated Jobs

- 🔁 Fetch HN Stories → Every 3 hours
- 📊 Generate Daily Report → Every day at 9 PM

---

## 🔮 Future Improvements

- User-specific personalization vectors
- Vector database (FAISS)
- Email newsletter delivery
- Trending analytics dashboard
- Authentication system
- Multi-source aggregation (TechCrunch, GitHub Trending, etc.)
- Deployment (Docker + CI/CD)

---

## 📈 What This Project Demonstrates

- Full-stack engineering
- Microservices architecture
- NLP integration in production
- AI-based ranking systems
- Cron-based automation
- REST API design
- Clean frontend architecture

---

## 👨‍💻 Author

Vinay Kumar  
B.Tech Student | AI + Full Stack Developer  

---

## 📜 License

MIT License

---

## ⭐ If You Like This Project

Give it a star ⭐ and feel free to fork or contribute!
