const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const shortid = require('shortid');
const Url = require('./Url');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ POST /shorten → create a short URL
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = shortid.generate();

  try {
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save();
    res.json({
      originalUrl,
      shortUrl: `http://localhost:5000/${shortCode}`
    });
  } catch (err) {
    console.error('❌ Error creating short URL:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET /:code → redirect to the original URL
app.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (url) {
      url.clicks += 1;
      await url.save();
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    console.error('❌ Error during redirect:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET /stats/:code → get stats about the short URL
app.get('/stats/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });
    if (url) {
      res.json({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt
      });
    } else {
      res.status(404).json({ error: 'Short URL not found' });
    }
  } catch (err) {
    console.error('❌ Error fetching stats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
