import { useState } from 'react';
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"; 

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(`${API_BASE}/predict`, { text: textInput });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Only PDF files are allowed.');
    }
  };

  const handleFileSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_BASE}/upload_pdf`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to process PDF. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (prob) => {
    if (prob < 30) return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
    if (prob < 70) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    return 'text-rose-600 bg-rose-100 dark:bg-rose-900/30';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Scam Detector
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Protect yourself — analyze messages or documents instantly
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'text'
                ? 'border-b-2 border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Paste Text
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'pdf'
                ? 'border-b-2 border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Upload PDF
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-700/60">
          {activeTab === 'text' ? (
            <div className="space-y-6">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste the suspicious message, email, WhatsApp text, etc. here..."
                rows={8}
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />

              <button
                onClick={handleTextSubmit}
                disabled={loading || !textInput.trim()}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200/30 dark:shadow-indigo-900/20 transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  'Check for Scam'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                    : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 bg-slate-50 dark:bg-slate-900/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                    <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    Drag & drop your PDF here
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">or</p>
                  <label className="inline-block px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg cursor-pointer transition">
                    Browse files
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-4">
                      Selected: {file.name}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleFileSubmit}
                disabled={loading || !file}
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold rounded-xl shadow-lg shadow-purple-200/30 dark:shadow-purple-900/20 transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing PDF...
                  </>
                ) : (
                  'Analyze PDF'
                )}
              </button>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-700/60 animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
              Analysis Result
            </h2>

            <div className="text-center space-y-4">
              <div className={`inline-block px-8 py-4 rounded-2xl text-4xl font-bold ${getRiskColor(result.scam_probability)}`}>
                {result.scam_probability}%
              </div>

              <p className="text-xl font-semibold">
                {result.is_scam ? (
                  <span className="text-rose-600 dark:text-rose-400">High Risk — Likely a Scam</span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400">Low Risk — Probably Safe</span>
                )}
              </p>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Scam probability: <strong>{result.scam_probability}%</strong>
                </p>
              </div>
            </div>

            {result.signals && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Fraud Intelligence Report
                </h3>

                <div className="space-y-3">
                  {result.signals.map(([msg, level], i) => (
                    <div
                      key={i}
                      className={`px-4 py-3 rounded-lg border ${
                        level === "HIGH"
                          ? "bg-red-900/30 border-red-500 text-red-300"
                          : level === "MEDIUM"
                          ? "bg-yellow-900/30 border-yellow-500 text-yellow-300"
                          : "bg-blue-900/30 border-blue-500 text-blue-300"
                      }`}
                    >
                      <b>{level}:</b> {msg}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 px-6 py-4 rounded-xl text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;