import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../features/newsSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const categories = ['technology', 'sports', 'entertainment'];

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#87ceeb' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: '#000000', fontWeight: 'bold' }}>Lajja's News App</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#000000', fontWeight: 'bold' }}
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category) => (
                  <li key={category}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(category);
                      }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex align-items-center">
            <input className="form-control me-2 black-search-input" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn black-search-button me-3" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
