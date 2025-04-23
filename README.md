# News Portal React App

## Overview

This React application fetches and displays news articles using the NewsAPI (https://newsapi.org). It uses Redux Toolkit for state management and axios for API requests.

## Setup

1. Clone the repository and navigate to the `my-app` directory.

2. Install dependencies:

```bash
npm install
```

3. API Key Configuration:

- The app requires a NewsAPI key to fetch news.
- The API key is currently hardcoded in `src/features/newsSlice.js` for testing purposes.
- To use your own API key, replace the `API_KEY` constant in `src/features/newsSlice.js`:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

- Alternatively, you can set the API key in a `.env` file at the root of `my-app`:

```
REACT_APP_NEWS_API_KEY=your_actual_api_key_here
```

and update `newsSlice.js` to use the environment variable.

4. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000` (or another port if 3000 is in use).

## Usage

- The app fetches top headlines from the NewsAPI for the US by default.
- Use the pagination buttons to navigate through pages.
- If news fails to load, an error message will be displayed with details.

## Troubleshooting

- Ensure your API key is valid and has not exceeded usage limits.
- Check the browser console for error logs.
- Restart the development server after changing environment variables or API key.

## Logs for Debugging

The app logs the following to the browser console:

- Request parameters used for fetching news.
- Full API response from NewsAPI.
- Any errors encountered during fetching.

Use these logs to diagnose issues with news fetching.

## Dependencies

- React
- Redux Toolkit
- React Redux
- Axios

## License

MIT License
