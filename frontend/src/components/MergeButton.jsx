import React from 'react';
import './MergeButton.css';

function MergeButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      className={`merge-button ${loading ? 'merge-button--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={loading ? 'Merging PDFs' : 'Merge PDFs'}
    >
      {loading ? (
        <>
          <span className="merge-button__spinner"></span>
          <span className="merge-button__text">Merging</span>
        </>
      ) : (
        'Merge PDFs'
      )}
    </button>
  );
}

export default MergeButton;
