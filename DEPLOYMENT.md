# Deploy to Vercel (Recommended)

The CORS issue can only be fixed by having a proper backend server handle the API requests. This app is configured to deploy to **Vercel** which supports both frontend and backend.

## Quick Deploy (1 minute)

### Option 1: Deploy with Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel
```

Follow the prompts to create a new Vercel project.

### Option 2: Deploy with GitHub (Easiest)

1. Push this code to GitHub
2. Go to https://vercel.com
3. Click "New Project" → Import your GitHub repository
4. Vercel auto-detects the setup
5. Click "Deploy"

## How It Works

- **React Frontend**: Deployed to Vercel's CDN
- **Node.js Backend**: Runs on Vercel's serverless functions
- **API Calls**: All routed through the backend (no CORS errors!)

## Configuration

The setup is already configured in:
- `vercel.json` - Define build and routing
- `server.js` - Backend API server
- `src/features/newsSlice.js` - Uses `/api/news` endpoint

After deployment, your app will work perfectly with no CORS errors!

## Local Testing

Local development still works as before:
```bash
npm run dev
```

Runs on http://localhost:3000 with backend at http://localhost:5000
