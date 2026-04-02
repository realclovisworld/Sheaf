import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import MergeButton from './components/MergeButton';
import UploadProgressBar from './components/UploadProgressBar';
import { mergePDFs } from './utils/merge';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFilesSelected = (newFiles) => {
    setFiles(newFiles);
    setError(null);
    setSuccess(false);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Gather at least two pages.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Client-side PDF merging using pdf-lib
      const result = await mergePDFs(files);

      // Download the merged PDF
      const url = window.URL.createObjectURL(result.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = result.name;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setSuccess(true);
      setFiles([]);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const maxSizeExceeded = totalSize > 20 * 1024 * 1024;

  return (
    <div className="app">
      <header className="app-branding-header">
        <img src="/logo.jpeg" alt="Sheaf Logo" className="app-logo-image" />
        <h1 className="app-title-main">Sheaf</h1>
      </header>

      <main className="app-container">
        <header className="app-header">
          <p className="app-subtitle">Drop files to gather them into a single document</p>
        </header>

        <FileUploader onFilesSelected={handleFilesSelected} loading={loading} />

        {error && (
          <div className="message message--error" role="alert">
            <span className="message-icon">⚠</span>
            {error}
          </div>
        )}

        {success && (
          <div className="message message--success" role="status">
            <span className="message-icon">✓</span>
            Your sheaf is ready
          </div>
        )}

        {files.length > 0 && (
          <>
            <FileList files={files} onRemoveFile={handleRemoveFile} />
            
            <UploadProgressBar files={files} />

            <MergeButton
              onClick={handleMerge}
              disabled={loading || files.length < 2 || maxSizeExceeded}
              loading={loading}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">
            © 2026 Sheaf. Built by <span className="footer-author">Clovis Atiki</span>
          </p>
          <div className="footer-socials">
            <a
              href="https://x.com/realclovisworld"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Twitter/X"
              title="X"
            >
              𝕏
            </a>
            <a
              href="https://www.instagram.com/realclovisworld/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
            </a>
            <a
              href="https://github.com/realclovisworld"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
