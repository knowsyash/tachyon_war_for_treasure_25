# 🎮 Treasure Hunt - Complete Setup Summary

## ✅ Everything is Now Running!

### **Backend Server**
- **Status:** ✅ Running
- **HTTP API Port:** 3002
- **WebSocket Port:** 8080
- **Database:** Neon PostgreSQL (Cloud)
- **Database URL:** Connected to your Neon database
- **All tables created:** Team, User, Question, TeamProgress, Hint

### **Frontend Server**
- **Status:** ✅ Running
- **Port:** 3001
- **URL:** http://localhost:3001
- **API Config:** Automatically pointing to backend at localhost:3002

---

## 🔧 What Was Fixed

### 1. **Database Setup**
- ✅ Created `.env` file with your Neon PostgreSQL connection
- ✅ Ran Prisma migrations to create all database tables
- ✅ Generated Prisma Client for TypeScript

### 2. **Backend Configuration**
- ✅ Added `ts-node` to run TypeScript directly
- ✅ Added npm scripts: `dev`, `build`, `start`, `prisma:generate`, `prisma:push`
- ✅ Changed port from 3000 to 3002 (to avoid conflicts)
- ✅ Server accepts environment variable PORT

### 3. **Frontend Configuration**
- ✅ Created centralized API config at `src/config/api.ts`
- ✅ Updated all 7 API endpoint calls to use the config
- ✅ Created `.env.local` with API URLs
- ✅ All endpoints now point to `localhost:3002`

### 4. **Navigation Fixes**
- ✅ Added router to register page
- ✅ Auto-redirect to `/login` after successful registration (2-second delay)
- ✅ Login page already redirects to `/quiz` after successful login

---

## 🚀 How to Use Your App

### **Access Your App:**
1. Open browser: **http://localhost:3001**
2. Click "Register" or go to http://localhost:3001/register
3. Register your team (team name, password, 4 players)
4. Auto-redirects to login page
5. Login with your team credentials
6. Start the treasure hunt quiz!

---

## 📋 Available API Endpoints

Your backend exposes these endpoints on **http://localhost:3002**:

### **Authentication:**
- `POST /register-team` - Register new team
- `POST /login-team` - Login team

### **Quiz:**
- `POST /unsolved-questions` - Get questions for a team
- `POST /submit-answer` - Submit answer
- `GET /get-questions` - Get all questions
- `GET /get-hints` - Get all hints

### **Team Management:**
- `POST /team-locked` - Check if team is locked
- `POST /toggle-team-lock` - Lock/unlock specific team
- `POST /lock-all-teams` - Lock all teams
- `POST /unlock-all-teams` - Unlock all teams

### **Leaderboard:**
- `GET /get-teams` - Get teams ranked by completion

### **WebSocket (ws://localhost:8080):**
- Real-time hints
- Team lock/unlock notifications

---

## 🔄 How to Restart Servers

### **If Backend Stops:**
```powershell
cd 'c:\Users\yashs\OneDrive\Desktop\warfortreasure\Treasure-mozilla\Treasure-hunt_Backend'
npx ts-node src/index.ts
```

### **If Frontend Stops:**
```powershell
cd 'c:\Users\yashs\OneDrive\Desktop\warfortreasure\Treasure-mozilla\Treasure-hunt_FrontEnd'
npm run dev
```

---

## 🔐 Your Database Info

- **Provider:** Neon PostgreSQL (Serverless)
- **Connection:** Configured in `Treasure-hunt_Backend\.env`
- **Tables:** All created and ready
- **Data:** Persistent (survives server restarts)

---

## 🎯 Next Steps

1. **Add Questions:** Use POST `/add-question` endpoint to add quiz questions
2. **Test Registration:** Register a test team
3. **Test Login:** Login and navigate to quiz page
4. **Test Quiz Flow:** Answer questions and see progress
5. **Add Hints:** Send hints via WebSocket for all teams to see

---

## 🐛 Troubleshooting

### **Port Already in Use:**
- Backend uses port 3002 (configurable via PORT in `.env`)
- Frontend auto-switches to 3001 if 3000 is busy

### **Database Connection Error:**
- Check `.env` file exists in Backend folder
- Verify DATABASE_URL is correct
- Neon database should auto-wake from sleep

### **API Not Responding:**
- Ensure backend is running: check for "Server running on port 3002"
- Test: `curl.exe http://localhost:3002/get-questions`

### **Frontend Not Loading:**
- Clear browser cache
- Check terminal for compilation errors
- Restart: Ctrl+C then `npm run dev`

---

## 📁 Important Files

- **Backend ENV:** `Treasure-hunt_Backend\.env`
- **Frontend ENV:** `Treasure-hunt_FrontEnd\.env.local`
- **API Config:** `Treasure-hunt_FrontEnd\src\config\api.ts`
- **Prisma Schema:** `Treasure-hunt_Backend\src\prisma\schema.prisma`

---

## ✨ Everything is Ready!

Your treasure hunt app is fully configured and running. Both servers are up, database is connected, and all pages are accessible.

**Go to http://localhost:3001 and start your treasure hunt! 🏴‍☠️**
