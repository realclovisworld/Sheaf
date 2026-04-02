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
        throw new Error(errorData.detail || 'Merge failed.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged.pdf';
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
      <main className="app-container">
        <header className="app-header">
          <h1 className="app-title">Merge PDFs</h1>
          <p className="app-subtitle">Drop files to combine them into a single document</p>
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
            Downloaded successfully
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

        {!files.length && !loading && (
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <p className="empty-state-title">No PDFs</p>
            <p className="empty-state-text">Drop files to merge them into one document</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
