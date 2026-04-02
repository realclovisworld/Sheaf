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
            <div className="dropzone__icon">📄</div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
