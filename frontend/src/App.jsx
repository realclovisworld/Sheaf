import React, { useState } from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import MergeButton from './components/MergeButton';

function App() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilesSelected = (newFiles) => {
    setFiles(newFiles);
    setError(null);
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files');
      return;
    }

    setLoading(true);
    setError(null);

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
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to merge PDFs');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message || 'An error occurred while merging PDFs');
    } finally {
      setLoading(false);
    }
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Merger</h1>
        <p>Merge multiple PDF files into a single document</p>
      </header>

      <main className="App-main">
        <FileUploader onFilesSelected={handleFilesSelected} />

        {error && <div className="error-message">{error}</div>}

        {files.length > 0 && (
          <>
            <FileList files={files} onRemoveFile={handleRemoveFile} />
            <div className="size-info">
              <p>
                Total size: {totalSizeMB} MB / 50 MB{' '}
                {totalSize > 50 * 1024 * 1024 && (
                  <span className="size-warning">⚠️ Exceeds limit!</span>
                )}
              </p>
            </div>
            <MergeButton
              onClick={handleMerge}
              disabled={loading || files.length < 2}
              loading={loading}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;