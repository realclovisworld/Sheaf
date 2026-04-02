from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import io
import pikepdf
from typing import List

app = FastAPI(title="PDF Merger API")

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MAX_FILES = 10
MAX_TOTAL_SIZE = 50 * 1024 * 1024  # 50MB
MAX_FILE_SIZE = 10 * 1024 * 1024   # 10MB


@app.post("/api/merge")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """
    Merge multiple PDF files into a single document.
    
    Constraints:
    - Maximum 10 files
    - Total size ≤ 50MB
    - Individual file ≤ 10MB
    - PDF files only
    """
    
    # Validate number of files
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="At least 2 files required")
    
    if len(files) > MAX_FILES:
        raise HTTPException(status_code=400, detail=f"Maximum {MAX_FILES} files allowed")
    
    # Read and validate files
    pdf_data = []
    total_size = 0
    file_contents = []
    
    for file in files:
        # Check file type
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail=f"Invalid file type: {file.filename}. Only PDFs allowed.")
        
        # Read file content
        content = await file.read()
        file_size = len(content)
        
        # Check individual file size
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail=f"File {file.filename} exceeds 10MB limit")
        
        total_size += file_size
        
        # Check total size
        if total_size > MAX_TOTAL_SIZE:
            raise HTTPException(status_code=400, detail=f"Total size exceeds 50MB limit")
        
        # Validate PDF
        try:
            pdf = pikepdf.open(io.BytesIO(content))
            pdf_data.append(pdf)
            file_contents.append(content)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid PDF: {file.filename}")
    
    # Merge PDFs
    try:
        merged_pdf = pikepdf.open(io.BytesIO(file_contents[0]))
        
        for pdf in pdf_data[1:]:
            merged_pdf.pages.extend(pdf.pages)
        
        # Save merged PDF to bytes
        output = io.BytesIO()
        merged_pdf.save(output)
        output.seek(0)
        
        return StreamingResponse(
            iter([output.getvalue()]),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error merging PDFs: {str(e)}")


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}


# Mangum handler for Vercel
handler = Mangum(app)
