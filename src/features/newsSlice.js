import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'f3de982428584a63af4dcbfd57af635d';

// Detect environment and use appropriate API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalhost ? '/api' : 'https://newsapi.org/v2';

// CORS proxy service for production
const getCORSProxy = (url) => {
  return `https://corsproxy.io/?${encodeURIComponent(url)}`;
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page, country, startDate, endDate }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const category = state.news.category || '';
      
      let url;
      let params = {
        pageSize: 10,
        page,
        category,
        country,
      };
      if (startDate) {
        params.from = startDate;
      }
      if (endDate) {
        params.to = endDate;
      }

      if (isLocalhost) {
        // Local: use backend proxy
        url = `${API_BASE_URL}/news`;
        console.log('Fetching from local backend:', url);
      } else {
        // Production: use CORS proxy with NewsAPI
        params.apiKey = API_KEY;
        const queryString = new URLSearchParams(params).toString();
        const newsApiUrl = `https://newsapi.org/v2/top-headlines?${queryString}`;
        url = getCORSProxy(newsApiUrl);
        params = {}; // Don't pass params again to axios
        console.log('Fetching via CORS proxy');
      }

      const response = await axios.get(url, {
        params: isLocalhost ? params : undefined,
        timeout: 10000,
      });
      
      console.log('News API response:', response.data);
      return response.data.articles;
    } catch (error) {
      console.error('Fetch news error:', error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    category: '',
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        console.error('Fetch news failed:', state.error);
      });
  },
});

export const { setCategory } = newsSlice.actions;

export default newsSlice.reducer;
