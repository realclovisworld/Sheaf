import React, { useRef } from 'react';
import './FileUploader.css';

function FileUploader({ onFilesSelected, loading }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);

  const validateAndAddFiles = (newFiles) => {
    const pdfFiles = Array.from(newFiles).filter((file) => file.type === 'application/pdf');
    
    if (pdfFiles.length !== newFiles.length) {
      alert('Only PDF files are supported.');
      return;
    }

    if (pdfFiles.length > 10) {
      alert('Maximum 10 PDFs per sheaf.');
      return;
    }

    onFilesSelected(pdfFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    validateAndAddFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    validateAndAddFiles(e.target.files);
  };

  return (
    <div
      className={`dropzone ${dragActive ? 'dropzone--drag-over' : ''} ${loading ? 'dropzone--loading' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf"
        onChange={handleChange}
        className="dropzone__input"
        aria-label="Upload PDF files"
        disabled={loading}
      />
      <div className="dropzone__content">
        {loading ? (
          <>
            <div className="dropzone__spinner">
              <div className="spinner"></div>
            </div>
            <p className="dropzone__status">Binding</p>
          </>
        ) : (
          <>
            <div className="dropzone__icon">
              <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">PDF</text>
              </svg>
            </div>
            <p className="dropzone__title">Gather your pages</p>
            <p className="dropzone__hint">or click to browse</p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="dropzone__button"
              aria-label="Browse and select PDF files"
            >
              Select files
            </button>
            <p className="dropzone__info">Upload pdf files and bind a maximum of 50MB</p>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
