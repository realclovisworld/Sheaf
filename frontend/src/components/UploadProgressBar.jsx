import React from 'react';
import './UploadProgressBar.css';

function UploadProgressBar({ files, maxSize = 50 * 1024 * 1024 }) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2);
  };

  const currentSize = files.reduce((sum, file) => sum + file.size, 0);
  const percentage = (currentSize / maxSize) * 100;
  const maxSizeExceeded = currentSize > maxSize;

  return (
    <div className="upload-progress">
      <div className="progress-bar-container">
        <div 
          className={`progress-bar ${maxSizeExceeded ? 'progress-bar--exceeded' : ''}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="progress-info">
        <p className="progress-label">
          <span className="progress-current">{formatFileSize(currentSize)}</span>
          {' / '}
          <span className="progress-max">{formatFileSize(maxSize)}</span>
          <span className="progress-unit"> MB</span>
        </p>
        {maxSizeExceeded && (
          <p className="progress-warning">Exceeds 50 MB limit</p>
        )}
      </div>
    </div>
  );
}

export default UploadProgressBar;
