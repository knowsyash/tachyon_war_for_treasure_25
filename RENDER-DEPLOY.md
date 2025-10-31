# 🚀 Deploy to Render.com - FREE

## Quick Deploy (5 minutes per service)

### Step 1: Deploy Backend

1. Go to [render.com](https://render.com)
2. Sign up/login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository: `knowsyash/tachyon_war_for_treasure_25`
5. Configure:
   - **Name**: `treasure-hunt-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate --schema=./src/prisma/schema.prisma && npx tsc`
   - **Start Command**: `node dist/index.js`
   - **Plan**: `Free`

6. **Add Environment Variables**:
   ```
   DATABASE_URL = your_neon_postgresql_url
   PORT = 3002
   NODE_ENV = production
   ```

7. Click **"Create Web Service"**
8. Wait 3-5 minutes for deployment
9. **Copy your backend URL**: `https://treasure-hunt-backend.onrender.com`

---

### Step 2: Deploy Frontend

1. Click **"New +"** → **"Web Service"** again
2. Same repository: `knowsyash/tachyon_war_for_treasure_25`
3. Configure:
   - **Name**: `treasure-hunt-frontend`
   - **Root Directory**: `frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

4. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL = https://treasure-hunt-backend.onrender.com
   NEXT_PUBLIC_WS_URL = wss://treasure-hunt-backend.onrender.com
   NODE_ENV = production
   ```
   ⚠️ **IMPORTANT**: Replace `treasure-hunt-backend` with YOUR actual backend URL from Step 1

5. Click **"Create Web Service"**
6. Wait 3-5 minutes for deployment

---

## ✅ Access Your App

- **Frontend**: `https://treasure-hunt-frontend.onrender.com`
- **Backend API**: `https://treasure-hunt-backend.onrender.com`
- **Health Check**: `https://treasure-hunt-backend.onrender.com/health`

---

## 🔄 Auto-Deploy

Every time you push to GitHub `main` branch, Render automatically redeploys! 🎉

---

## 📊 Monitor Your App

1. Go to Render dashboard
2. Click on each service
3. View:
   - Logs (real-time)
   - Metrics
   - Events
   - Environment variables

---

## ⚠️ Important Notes

### Free Tier Behavior:
- Services **sleep after 15 min** of inactivity
- Wake up takes **~30 seconds** on first request
- Perfect for events (not 24/7 apps)

### During Your Event:
Keep services awake by pinging health endpoint every 10 minutes:
```bash
# Use a service like cron-job.org or UptimeRobot
GET https://treasure-hunt-backend.onrender.com/health
```

---

## 🐛 Troubleshooting

### Build Fails:
- Check logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Prisma schema path is correct

### Frontend Can't Connect to Backend:
- Verify `NEXT_PUBLIC_API_URL` matches your backend URL
- Check CORS is enabled in backend (already done ✅)

### Database Connection Issues:
- Verify `DATABASE_URL` is correct
- Check Neon allows connections from `0.0.0.0/0`

---

## 💰 Cost

- Backend: **FREE** 
- Frontend: **FREE**
- Database (Neon): **FREE**
- **Total: $0** 🎉

---

## 🎯 Next Steps

1. Deploy backend first
2. Copy backend URL
3. Deploy frontend with backend URL
4. Test your app!
5. Push updates to GitHub = auto-deploy

**Your treasure hunt is ready to go live! 🏴‍☠️**
