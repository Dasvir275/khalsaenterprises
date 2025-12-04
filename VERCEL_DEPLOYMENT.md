# Deploying Khalsa Hitech Enterprises to Vercel

This guide explains how to deploy the Khalsa Hitech Enterprises website to Vercel with secure API handling.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [GitHub account](https://github.com) (recommended for easy deployment)
3. Your Gemini API key

## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**
   - Create a new repository on GitHub
   - Push this project to your repository

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add the following variable:
     ```
     GEMINI_API_KEY = your_gemini_api_key_here
     ```
   - Make sure to add it for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts to configure your project.

4. **Add Environment Variable**
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Enter your Gemini API key when prompted.

5. **Redeploy with Environment Variable**
   ```bash
   vercel --prod
   ```

## Project Structure for Vercel

```
├── api/
│   └── chat.ts          # Serverless function for HiTech Bot
├── client/
│   └── src/             # React frontend source
├── dist/
│   └── public/          # Built frontend (generated)
├── vercel.json          # Vercel configuration
└── package.json
```

## How It Works

- **Frontend**: Built as a static site using Vite and served from Vercel's CDN
- **API**: The `/api/chat` endpoint runs as a Vercel Serverless Function
- **Security**: Your Gemini API key is stored securely in Vercel's environment variables, never exposed to the client

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" or go to API Keys section
4. Create a new API key
5. Copy the key and add it to Vercel environment variables

## Troubleshooting

### Chat bot not responding
- Verify `GEMINI_API_KEY` is set correctly in Vercel environment variables
- Check Vercel function logs for errors

### Build failing
- Run `npm install` locally to check for dependency issues
- Ensure Node.js version is compatible (18.x or 20.x recommended)

### 404 errors on page refresh
- The `vercel.json` file includes rewrites to handle client-side routing
- Make sure `vercel.json` is in the root directory

## Custom Domain

1. Go to your project on Vercel Dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS settings as instructed by Vercel

## Support

For any issues with the website, contact:
- Phone: 7009073061
- Location: Village Hardhokhundpur, Punjab

---

Built with love for Khalsa Hitech Enterprises
