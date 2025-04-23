import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NewsList from './components/NewsList';

const App = () => {
  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <NewsList />
    </div>
  );
};

export default App;
