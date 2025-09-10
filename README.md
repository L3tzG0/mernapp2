# StudyPal

An AI-powered web app where users can enter topics/roles, generate questions and answers on the chosen topics, mark progress, and explore recommended YouTube resources for deeper learning.

## Features

- **User Authentication**  
- **Session Management**  
  - Create sessions with role, experience, and focus topics  
  - AI-generated interview questions & answers
  - Progress tracking (completed, in-progress, not-started)  
- **Interactive Q&A**
  - Mark questions as completed
  - Pin important questions
  - Load more questions dynamically  
- **AI Chatbot (Gemini)** for additional learning  
- **YouTube Integration**  
  - Fetches relevant videos once per session
  - Videos are saved in session and displayed on interview prep page  
- **Dashboard Overview** with all sessions

## 🛠️ Tech Stack

**Frontend**
- React JS
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Passport (JWT)
- Gemini API (Google Generative AI)
- YouTube Data API v3

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/L3tzG0/mernapp2.git
cd mernapp2
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create .env in backend/:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/your-mongodb-uri
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-api-key
YOUTUBE_API_KEY=your-youtube-api-key
```

Run backend:

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs at http://localhost:5173

Backend runs at http://localhost:8000
