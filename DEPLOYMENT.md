# Frontend Deployment Guide

This project has been configured to deploy only the frontend, connecting to an existing backend deployed on Vercel.

## Configuration

The frontend is configured to connect to the backend at:
- **Production**: `https://scripture-search-backend.vercel.app/api/scripture`
- **Development**: `/api/scripture` (for local development with backend)

## Deployment Steps

1. **Update Backend URL** (if needed):
   - Edit `src/config.js` and update the production `apiBaseUrl` to point to your backend
   - The current configuration assumes your backend is at `scripture-search-backend.vercel.app`

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Environment Variables** (if needed):
   - Add any environment variables in the Vercel dashboard
   - The frontend will automatically use the correct API URL based on the environment

## Project Structure

- `src/` - React frontend code
- `src/config.js` - API configuration for different environments
- `vercel.json` - Vercel deployment configuration
- `package.json` - Frontend dependencies and scripts

## Backend Requirements

Your backend should expose these endpoints:
- `GET /api/scripture/navigation` - Get scripture navigation data
- `GET /api/scripture/search` - Search scriptures
- `GET /api/scripture/chapter` - Get chapter content

## Development

For local development with a local backend:
1. Start your backend server
2. Run `pnpm dev` to start the frontend
3. The frontend will automatically use the local API endpoints

## Production

The frontend will automatically use the production backend URL when deployed to Vercel. 