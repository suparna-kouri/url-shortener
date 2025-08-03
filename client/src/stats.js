import React, { useState } from 'react';
import axios from 'axios';

function Stats() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetStats = async () => {
    if (!code) {
      alert('Please enter the short code');
      return;
    }
    try {
      setLoading(true);
      console.log('Fetching stats for code:', code);
      const response = await axios.get(`http://localhost:5000/stats/${code}`);
      console.log('Stats response:', response.data);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
      alert('❌ Failed to get stats. Check if code is correct.');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h3>📊 Check URL Stats</h3>
      <input
        type="text"
        placeholder="Enter short code (e.g., lW7daJFPI)"
        value={code}
        onChange={e => setCode(e.target.value)}
        style={{ width: '250px', padding: '5px' }}
      />
      <button onClick={handleGetStats} style={{ marginLeft: '10px', padding: '5px 10px' }} disabled={loading}>
        {loading ? 'Loading...' : 'Get Stats'}
      </button>

      {stats && (
        <div style={{ marginTop: '20px' }}>
          <p>🔗 Original URL: {stats.originalUrl}</p>
          <p>📅 Created At: {new Date(stats.createdAt).toLocaleString()}</p>
          <p>👁️‍🗨️ Clicks: {stats.clicks}</p>
        </div>
      )}
    </div>
  );
}

export default Stats;
