import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const [codeForStats, setCodeForStats] = useState('');
  const [stats, setStats] = useState(null);

  const handleShorten = async () => {
    if (!originalUrl) {
      alert('Please enter a URL');
      return;
    }
    try {
      setLoading(true);
      console.log('Sending POST to server with:', originalUrl);

      const response = await axios.post('http://localhost:5000/shorten', { originalUrl });
      console.log('Server response:', response.data);

      setShortUrl(response.data.shortUrl);
    } catch (err) {
      console.error('Error from server:', err);
      alert('❌ Failed to shorten URL. Check server console or browser console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetStats = async () => {
    if (!codeForStats) {
      alert('Please enter a short code');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/stats/${codeForStats}`);
      console.log('Stats response:', response.data);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      alert('❌ Failed to get stats. Make sure the code exists.');
      setStats(null);
    }
  };

  return (
    <div className="App">
      <h2>🔗 URL Shortener</h2>
      <input
        type="text"
        placeholder="Enter long URL"
        value={originalUrl}
        onChange={e => setOriginalUrl(e.target.value)}
        style={{ width: '300px', padding: '5px' }}
      />
      <button onClick={handleShorten} style={{ marginLeft: '10px', padding: '5px 10px' }} disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten'}
      </button>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>✅ Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h3>📊 Get Stats by Short Code</h3>
      <input
        type="text"
        placeholder="Enter short code (e.g. abc123)"
        value={codeForStats}
        onChange={e => setCodeForStats(e.target.value)}
        style={{ width: '200px', padding: '5px' }}
      />
      <button onClick={handleGetStats} style={{ marginLeft: '10px', padding: '5px 10px' }}>
        Get Stats
      </button>

      {stats && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <p><strong>Original URL:</strong> {stats.originalUrl}</p>
          <p><strong>Short Code:</strong> {stats.shortCode}</p>
          <p><strong>Clicks:</strong> {stats.clicks}</p>
          <p><strong>Created At:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
