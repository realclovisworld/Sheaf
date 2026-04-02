import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import MergeButton from './components/MergeButton';

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
      setError('Select at least two documents.');
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
      link.download = 'bound.pdf';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      setSuccess(true);
      setFiles([]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  const maxSizeExceeded = totalSize > 50 * 1024 * 1024;

  return (
    <div className="app">
      <header className="app-header">
        <h1>PDF Binder</h1>
        <p>Combine pages into one.</p>
      </header>

      <main className="app-main">
        <FileUploader onFilesSelected={handleFilesSelected} />

        {error && (
          <div className="message message--error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="message message--success" role="status">
            PDF bound and ready.
          </div>
        )}

        {files.length > 0 && (
          <>
            <FileList files={files} onRemoveFile={handleRemoveFile} />
            
            <div className="size-info">
              <span className="size-info__label">Total:</span>
              <span className={`size-info__value ${maxSizeExceeded ? 'size-info__value--warn' : ''}`}>
                {totalSizeMB} MB / 50 MB
              </span>
            </div>

            <MergeButton
              onClick={handleMerge}
              disabled={loading || files.length < 2 || maxSizeExceeded}
              loading={loading}
            />
          </>
        )}

        <footer className="app-footer">
          <p>Max 10 documents, 50 MB total. PDF files only.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;