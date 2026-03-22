const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_KEY = 'f3de982428584a63af4dcbfd57af635d';
const API_BASE_URL = 'https://newsapi.org/v2';

// Proxy endpoint for fetching news
app.get('/api/news', async (req, res) => {
  try {
    const { page, country, category, from, to, pageSize } = req.query;

    const params = {
      apiKey: API_KEY,
      pageSize: pageSize || 10,
      page: page || 1,
    };

    if (country) params.country = country;
    if (category) params.category = category;
    if (from) params.from = from;
    if (to) params.to = to;

    console.log('Fetching from News API with params:', params);

    const response = await axios.get(`${API_BASE_URL}/top-headlines`, {
      params,
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from News API:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      status: 'error',
      message: error.response?.data?.message || error.message,
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
