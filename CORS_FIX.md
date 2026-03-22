# CORS Error Fix - Setup Instructions

## Problem Fixed
Your React app was making direct API calls to newsapi.org from the browser, which triggers CORS restrictions on the Developer plan. This only allows localhost requests.

## Solution
Created a backend proxy server (Express.js) that handles all News API calls server-side. Your React app now communicates with this local backend instead.

## How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Both Server and React App (Recommended)
```bash
npm run dev
```
This uses `concurrently` to run both:
- Backend server on `http://localhost:5000`
- React app on `http://localhost:3000`

### 3. OR Run Them Separately

**Terminal 1 - Start the backend server:**
```bash
npm run server
```
The server will be available at `http://localhost:5000`

**Terminal 2 - Start React development server:**
```bash
npm start
```
The app will be available at `http://localhost:3000`

## What Changed

### Files Added:
- `server.js` - Express backend proxy that handles all News API calls
- `.env` - Environment configuration

### Files Modified:
- `package.json` - Added backend dependencies and scripts
- `src/features/newsSlice.js` - Changed to call local backend at `http://localhost:5000/api/news` instead of direct newsapi.org calls

## How It Works

1. Your React app calls `http://localhost:5000/api/news`
2. The Express server receives the request
3. The server calls newsapi.org (server-to-server) with your API key
4. Response is sent back to React app
5. No more CORS errors! ✅

## Environment Variables
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

All API keys are now secure on the backend and not exposed to the browser.
