# PDF Merger - Deployment Guide

## Prerequisites
- GitHub account with repository push access
- Vercel account (free tier is sufficient)
- Git installed locally

## Step 1: Push to GitHub

```bash
cd ~/Documents/PDF_Merger
git add -A
git commit -m "Final: Ready for Vercel deployment"
git remote add origin https://github.com/YOUR_USERNAME/pdf-merger.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 2: Deploy on Vercel

### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click "Deploy"

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

Follow the prompts to connect and deploy.

## Deployment Checklist

- [x] `vercel.json` configured with build command and routes
- [x] `.vercelignore` excludes unnecessary files
- [x] `requirements.txt` includes all Python dependencies
- [x] Frontend builds successfully with `npm run build`
- [x] API endpoint tested locally
- [x] CORS configured in FastAPI
- [x] Error handling implemented
- [x] File validation in place

## Post-Deployment

### Test the Application
1. Navigate to your Vercel deployment URL
2. Try uploading 2-3 test PDFs
3. Verify the merge functionality
4. Download the merged PDF
5. Test error cases:
   - Single file upload (should show error)
   - Non-PDF file (should show error)
   - Oversized file (>10MB)

### Monitoring
- Check Vercel dashboard for deployment logs
- Monitor function execution time
- Review error logs if merges fail

## Common Issues

**Issue**: "Could not find module" error in serverless function
- **Solution**: Ensure all dependencies are in `requirements.txt`

**Issue**: CORS errors when frontend calls API
- **Solution**: Already configured with `allow_origins=["*"]` in FastAPI

**Issue**: Build times out
- **Solution**: Vercel's default timeout is 45 seconds. Optimize by removing unnecessary dependencies

**Issue**: Merged PDF is corrupt
- **Solution**: Ensure PDFs are valid. Use pikepdf validation.

## Environment Variables

No environment variables are currently required. If needed in the future, add them in Vercel dashboard under Project Settings → Environment Variables.

## Performance Notes

- Average merge time: 1-5 seconds for typical PDFs
- Maximum execution time: 30 seconds (Vercel limit)
- Memory allocation: 3008 MB per function
- Cold start: ~1-2 seconds
- Subsequent requests: <500ms

## Scaling & Limits

- **Concurrent executions**: Limited by Vercel plan
- **Maximum file size**: 10MB per file
- **Maximum total size**: 50MB per request
- **Maximum PDFs**: 10 files per merge
- **Request timeout**: 30 seconds

## Support & Troubleshooting

For detailed logs:
1. Go to Vercel Dashboard
2. Click on your project
3. Navigate to "Deployments" → select latest → "Logs"

For local testing before deployment:
```bash
cd ~/Documents/PDF_Merger
source venv/bin/activate

# Terminal 1: Start API
python -m uvicorn api.merge:app --host 127.0.0.1 --port 8000

# Terminal 2: Start frontend
cd frontend
npm start
```

Visit `http://localhost:3000` to test the full application.
