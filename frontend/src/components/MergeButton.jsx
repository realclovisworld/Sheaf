import React from 'react';
import './MergeButton.css';

function MergeButton({ onClick, disabled, loading }) {
  return (
    <button
      className="merge-button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={loading ? 'Binding documents...' : 'Bind documents'}
    >
      <span className="merge-button__text">
        {loading ? 'Binding…' : 'Bind'}
      </span>
      {loading && <span className="merge-button__spinner" />}
    </button>
  );
}

export default MergeButton;
