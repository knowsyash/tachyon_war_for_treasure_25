# API Configuration Guide

## Overview
All API endpoints are now centralized in `src/config/api.ts`. This makes it easy to switch between local development and production environments.

## How to Change API URLs

### Method 1: Using Environment Variables (Recommended)

Edit the `.env.local` file in the frontend root directory:

**For Local Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

**For Production (AWS EC2):**
```env
NEXT_PUBLIC_API_URL=http://ec2-13-239-119-91.ap-southeast-2.compute.amazonaws.com:3000
NEXT_PUBLIC_WS_URL=ws://ec2-13-239-119-91.ap-southeast-2.compute.amazonaws.com:8080
```

### Method 2: Directly Edit the Config File

Open `src/config/api.ts` and change the default values:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://YOUR_API_URL:3000',
  WS_URL: 'ws://YOUR_WS_URL:8080',
};
```

## Updated Files

The following files now use the centralized config:

1. **quiz/page.tsx** - 5 API calls updated
   - Team locked check
   - Unsolved questions
   - Get hints
   - WebSocket connection
   - Submit answer

2. **login/page.tsx** - 1 API call updated
   - Login team

3. **register/page.tsx** - 1 API call updated
   - Register team

## Available Endpoints

All endpoints are defined in `src/config/api.ts`:

- `API_ENDPOINTS.REGISTER_TEAM`
- `API_ENDPOINTS.LOGIN_TEAM`
- `API_ENDPOINTS.TEAM_LOCKED`
- `API_ENDPOINTS.UNSOLVED_QUESTIONS`
- `API_ENDPOINTS.GET_HINTS`
- `API_ENDPOINTS.SUBMIT_ANSWER`
- `API_ENDPOINTS.GET_QUESTIONS`
- `API_ENDPOINTS.GET_TEAMS`
- `API_CONFIG.WS_URL` (WebSocket)

## Important Notes

- After changing `.env.local`, restart your Next.js dev server
- The `.env.local` file is already in `.gitignore` (should be)
- Always use `NEXT_PUBLIC_` prefix for client-side environment variables in Next.js
