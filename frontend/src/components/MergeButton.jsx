import React from 'react';
import './MergeButton.css';

function MergeButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      className={`merge-button ${loading ? 'merge-button--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={loading ? 'Binding PDFs' : 'Bind PDFs'}
    >
      {loading ? (
        <>
          <span className="merge-button__spinner"></span>
          <span className="merge-button__text">Binding</span>
        </>
      ) : (
        'Bind your pages'
      )}
    </button>
  );
}

export default MergeButton;
