# PDF Merger - Quick Start Guide

## Running Locally

The project has two separate parts: **Backend** (Python API) and **Frontend** (React app).

### Setup (One-time)

```bash
cd ~/Documents/PDF_Merger

# Activate Python virtual environment
source venv/bin/activate

# Install frontend dependencies (if not already done)
cd frontend && npm install && cd ..
```

### Start Development Servers

**Option 1: Two Terminal Windows (Recommended)**

**Terminal 1 - Start Backend API:**
```bash
cd ~/Documents/PDF_Merger
source venv/bin/activate
python -m uvicorn api.merge:app --reload
```
Backend will run on: http://127.0.0.1:8000

**Terminal 2 - Start Frontend App:**
```bash
cd ~/Documents/PDF_Merger/frontend
npm start
```
Frontend will run on: http://localhost:3000

Visit **http://localhost:3000** in your browser to use the app!

### Testing the Application

1. **Upload PDFs:**
   - Drag and drop 2-3 PDF files into the upload area
   - Or click "Browse Files" to select PDFs

2. **Merge:**
   - Click "⬇️ Merge PDFs" button
   - Wait for the merge to complete (1-5 seconds typical)
   - PDF automatically downloads as `merged.pdf`

3. **Test Error Cases:**
   - Try uploading a single file (should show error)
   - Try uploading a non-PDF file (should show error)
   - Try uploading files over 10MB each (should show error)

### API Endpoints

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Merge PDFs:**
```bash
curl -X POST \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf" \
  http://localhost:8000/api/merge \
  -o merged.pdf
```

### Troubleshooting

**"Port 8000/3000 already in use":**
```bash
# Kill process on port 8000
lsof -ti :8000 | xargs kill -9

# Kill process on port 3000
lsof -ti :3000 | xargs kill -9
```

**npm/venv not found:**
Make sure you're in the correct directory and have activated the virtual environment:
```bash
cd ~/Documents/PDF_Merger
source venv/bin/activate
```

**Module not found (Python):**
Reinstall dependencies:
```bash
source venv/bin/activate
pip install -r requirements.txt
```

**Module not found (npm):**
Reinstall dependencies:
```bash
cd frontend
npm install --force
```

## Production Deployment

When ready to deploy to Vercel:

1. **Push to GitHub:**
```bash
cd ~/Documents/PDF_Merger
git push origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Vercel auto-detects `vercel.json`
   - Click Deploy!

See `DEPLOYMENT.md` for detailed deployment instructions.
