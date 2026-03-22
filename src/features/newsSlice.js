import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use relative path - proxy will route to backend
const API_BASE_URL = '/api';

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
      const response = await axios.get(`${API_BASE_URL}/news`, {
        params,
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
