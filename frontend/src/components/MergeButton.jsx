import React from 'react';
import './MergeButton.css';

function MergeButton({ onClick, disabled, loading }) {
  return (
    <button
      className="merge-button"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Merging...
        </>
      ) : (
        '⬇️ Merge PDFs'
      )}
    </button>
  );
}

export default MergeButton;
