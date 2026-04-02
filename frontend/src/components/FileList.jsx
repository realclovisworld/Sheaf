import React from 'react';
import './FileList.css';

function FileList({ files, onRemoveFile }) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
  };

  return (
    <div className="file-list">
      {files.map((file, index) => (
        <div key={index} className="file-item">
          <div className="file-item__number">{index + 1}</div>
          <div className="file-item__icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="pdf-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <text x="8" y="17" font-size="8" font-weight="bold" fill="white">PDF</text>
            </svg>
          </div>
          <div className="file-item__info">
            <p className="file-item__name">{file.name}</p>
            <p className="file-item__size">{formatFileSize(file.size)}</p>
          </div>
          <div className="file-item__status">✓</div>
          <button
            type="button"
            onClick={() => onRemoveFile(index)}
            className="file-item__remove"
            aria-label={`Remove ${file.name}`}
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileList;
