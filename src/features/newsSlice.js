import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use relative path for local dev, CORS proxy for GitHub Pages
const getAPIURL = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '/api';
  }
  // CORS proxy for production on GitHub Pages
  return 'https://api.allorigins.win/raw?url=https://newsapi.org/v2';
};

const API_BASE_URL = getAPIURL();
const IS_LOCAL = API_BASE_URL === '/api';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ page, country, startDate, endDate }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const category = state.news.category || '';
      const params = {
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
      console.log('Fetching news with params:', params);
      
      let url;
      if (IS_LOCAL) {
        url = `${API_BASE_URL}/news`;
      } else {
        // Add API key and params for CORS proxy
        const apiKey = 'f3de982428584a63af4dcbfd57af635d';
        const queryString = new URLSearchParams({ ...params, apiKey }).toString();
        url = `${API_BASE_URL}/top-headlines?${queryString}`;
      }
      
      const response = await axios.get(url, {
        params: IS_LOCAL ? params : undefined,
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
