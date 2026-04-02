import React from 'react';
import './FileList.css';

function FileList({ files, onRemoveFile }) {
  return (
    <div className="file-list">
      <h3>Selected Files ({files.length})</h3>
      <ul>
        {files.map((file, index) => (
          <li key={index} className="file-item">
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRemoveFile(index)}
              className="remove-button"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
