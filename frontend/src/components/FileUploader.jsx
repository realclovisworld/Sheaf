import React, { useRef } from 'react';
import './FileUploader.css';

function FileUploader({ onFilesSelected }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);

  const validateAndAddFiles = (newFiles) => {
    const pdfFiles = Array.from(newFiles).filter((file) => file.type === 'application/pdf');
    
    if (pdfFiles.length !== newFiles.length) {
      alert('Only PDF files are allowed');
    }

    if (pdfFiles.length > 10) {
      alert('Maximum 10 files allowed');
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
      className={`file-uploader ${dragActive ? 'drag-active' : ''}`}
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
        className="file-input"
      />
      <div className="upload-prompt">
        <p>📄 Drag and drop PDF files here</p>
        <p>or</p>
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="browse-button"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
}

export default FileUploader;
