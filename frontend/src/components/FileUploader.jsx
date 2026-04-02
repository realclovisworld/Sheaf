import React, { useRef } from 'react';
import './FileUploader.css';

function FileUploader({ onFilesSelected }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);

  const validateAndAddFiles = (newFiles) => {
    const pdfFiles = Array.from(newFiles).filter((file) => file.type === 'application/pdf');
    
    if (pdfFiles.length !== newFiles.length) {
      alert('Only PDF files are supported.');
      return;
    }

    if (pdfFiles.length > 10) {
      alert('Maximum 10 documents per bind.');
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
      className={`file-uploader ${dragActive ? 'file-uploader--active' : ''}`}
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
        className="file-uploader__input"
        aria-label="Upload PDF files"
      />
      <div className="file-uploader__content">
        <div className="file-uploader__icon">📄</div>
        <p className="file-uploader__text">Drag PDFs here.</p>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="file-uploader__button"
          aria-label="Browse and select PDF files"
        >
          Or browse
        </button>
      </div>
    </div>
  );
}

export default FileUploader;
