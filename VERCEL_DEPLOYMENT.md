# Vercel Deployment Guide

## Files Added/Modified for Vercel Deployment

1. **vercel.json** - Vercel configuration for static site deployment
2. **.nvmrc** - Specifies Node.js version (18)
3. **package.json** - Added engines field for Node.js version

## Deployment Steps

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel should automatically detect it as a Vite project
   - Click "Deploy"

## If You Still Get Build Errors

If you still encounter the "Command 'npm run build' exited with 126" error, try these additional solutions:

### Option 1: Manual Build Settings in Vercel
In your Vercel project settings:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Option 2: Environment Variables
If your project uses environment variables, make sure to add them in Vercel's project settings under "Environment Variables".

### Option 3: Node.js Version
Ensure Vercel is using Node.js 18+ by checking the build logs.

## Troubleshooting

- **Error 126**: Usually indicates permission issues or missing build script
- **Module not found**: Check if all dependencies are in package.json
- **Build timeout**: Large projects might need optimization

The configuration files added should resolve the most common deployment issues with Vite projects on Vercel.
