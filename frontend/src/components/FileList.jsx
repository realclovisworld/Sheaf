import React from 'react';
import './FileList.css';

function FileList({ files, onRemoveFile }) {
  return (
    <div className="file-list">
      <h2 className="file-list__title">Documents ({files.length})</h2>
      <ul className="file-list__items">
        {files.map((file, index) => (
          <li key={index} className="file-item">
            <div className="file-item__info">
              <span className="file-item__number">{index + 1}.</span>
              <div className="file-item__details">
                <span className="file-item__name" title={file.name}>
                  {file.name}
                </span>
                <span className="file-item__size">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onRemoveFile(index)}
              className="file-item__remove"
              aria-label={`Remove ${file.name}`}
              title="Remove"
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
