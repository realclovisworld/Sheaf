# PDF Merger Web Application

A full-stack application for merging multiple PDF files into a single document. Built with FastAPI (Python) backend and React frontend, deployed on Vercel.

## Features

- 📄 Drag-and-drop file upload interface
- 🔀 Merge 2-10 PDF files
- 📊 File size tracking and validation (50MB total limit)
- ⚡ Fast PDF processing with pikepdf
- 🌐 Responsive React interface
- ☁️ Serverless deployment on Vercel

## Technical Stack

### Backend
- **Framework**: FastAPI with Mangum adapter
- **PDF Processing**: pikepdf (primary), PyPDF2 (fallback)
- **Deployment**: Vercel Serverless Functions

### Frontend
- **Framework**: React with Create React App
- **Styling**: Custom CSS
- **Features**: Drag-and-drop, file validation, progress indicators

## Setup & Development

### Prerequisites
- Python 3.9+
- Node.js 14+
- Git

### Local Development

1. **Clone and setup**
```bash
cd PDF_Merger
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Run backend (in project root)**
```bash
source venv/bin/activate
uvicorn api.merge:app --reload
```

4. **Run frontend (in frontend directory)**
```bash
npm start
```

The frontend will be available at `http://localhost:3000` and the API at `http://localhost:8000`.

## API Endpoints

### POST /api/merge
Merge multiple PDF files into a single document.

**Request**:
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Multiple PDF files as `files`

**Response**:
- Content-Type: `application/pdf`
- Returns: Merged PDF file

**Constraints**:
- Minimum: 2 files
- Maximum: 10 files
- Individual file size: ≤ 10MB
- Total size: ≤ 50MB
- File type: PDF only

**Example**:
```bash
curl -X POST http://localhost:8000/api/merge \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf" \
  -o merged.pdf
```

### GET /health
Health check endpoint.

**Response**: `{"status": "ok"}`

## Constraints & Limits

- **Maximum PDFs per merge**: 10
- **Total upload size**: ≤ 50MB (Vercel serverless limit)
- **Individual file size**: ≤ 10MB
- **Execution timeout**: 30 seconds (Vercel limit)
- **No persistent storage**: Stateless serverless functions

## Deployment to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial PDF Merger app"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Vercel will automatically detect the configuration
   - Deploy!

3. **Test Production**
   - The app will be available at `https://your-project.vercel.app`

## File Structure

```
pdf-merger/
├── api/
│   ├── __init__.py
│   └── merge.py                 # FastAPI endpoint
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUploader.jsx
│   │   │   ├── FileUploader.css
│   │   │   ├── FileList.jsx
│   │   │   ├── FileList.css
│   │   │   ├── MergeButton.jsx
│   │   │   └── MergeButton.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
├── requirements.txt
├── vercel.json
├── .gitignore
└── README.md
```

## Error Handling

The application validates all inputs and provides user-friendly error messages:

- **Invalid file type**: Only PDF files accepted
- **Too many files**: Maximum 10 files allowed
- **File too large**: Individual file must be ≤ 10MB
- **Total size exceeded**: Combined size must be ≤ 50MB
- **Corrupt PDF**: Invalid or corrupted PDF file
- **Merge error**: Unexpected error during PDF merging

## Performance Notes

- Pikepdf is optimized for performance and handles large PDFs efficiently
- Fallback to PyPDF2 available if package size exceeds Vercel limits
- File processing happens in-memory for speed
- Average merge time: < 5 seconds for typical PDFs

## License

MIT License

## Support

For issues or questions, please open an issue on GitHub.
