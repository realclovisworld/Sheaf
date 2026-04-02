import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import MergeButton from './components/MergeButton';
import UploadProgressBar from './components/UploadProgressBar';

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
      setError('Select at least two PDFs.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const detail = errorData.detail || 'Binding failed.';
        // Map backend errors to sheaf metaphor
        if (detail.includes('size')) {
          throw new Error('This sheaf would be too heavy.');
        } else if (detail.includes('number') || detail.includes('files')) {
          throw new Error('Gather at least two pages.');
        }
        throw new Error(detail);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sheaf.pdf';
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
  const maxSizeExceeded = totalSize > 50 * 1024 * 1024;

  return (
    <div className="app">
      <header className="app-branding">
        <span className="app-logo">𝐒</span>
        <h2 className="app-brand-name">Sheaf</h2>
      </header>

      <main className="app-container">
        <header className="app-header">
          <h1 className="app-title">Bring your pages together</h1>
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
        <p className="footer-text">
          © 2026 Sheaf. Built by <span className="footer-author">Clovis Atiki</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
