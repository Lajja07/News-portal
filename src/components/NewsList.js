import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../features/newsSlice';

const NewsList = () => {
  const dispatch = useDispatch();
  const { articles, status, category, error } = useSelector((state) => state.news);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('Fetching news with params:', { page, category, country: 'us' });
    dispatch(fetchNews({ page, country: 'us' }));
  }, [dispatch, page, category]);

  console.log('NewsList render:', { status, articlesLength: articles.length, category });

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container-fluid mt-0 bg-dark text-white rounded p-4">
      {status === 'loading' ? (
        <div className="d-flex justify-content-center mt-2">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : status === 'failed' ? (
        <div className="text-danger text-center mt-2">
          Failed to fetch news.
          <br />
          <small>Error: {typeof error === 'object' && error !== null ? JSON.stringify(error) : error}</small>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center mt-2 text-muted">No news articles found.</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {articles.map((article, index) => (
              <div className="col" key={index}>
                <div
                  className="card h-100 text-white shadow-lg"
                  style={{ backgroundColor: '#343a40' }}
                >
                  <img
                    src={article.urlToImage || 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    alt={article.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column text-white">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text" style={{ fontSize: '0.9rem' }}>
                      {article.description || 'No description available.'}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-skyblue mt-auto"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-skyblue" disabled={page === 1} onClick={handlePrev}>Previous</button>
            <span className="align-self-center">Page {page}</span>
            <button className="btn btn-skyblue" onClick={handleNext}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList;
