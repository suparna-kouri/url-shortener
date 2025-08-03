const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Url = require('./Url');
const app = express();

app.use(express.json());
app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = 'testCode';
  const newUrl = new Url({ originalUrl, shortCode });
  await newUrl.save();
  res.json({ originalUrl, shortCode });
});

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/urlShortenerTest');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

test('POST /shorten should return shortCode', async () => {
  const response = await request(app)
    .post('/shorten')
    .send({ originalUrl: 'https://example.com' });

  expect(response.body).toHaveProperty('shortCode');
});
