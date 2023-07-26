import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to the Blog App!</h1>
        <p className="home-description">
          Explore a world of fascinating blog posts on various topics.
        </p>
        <Link to="/blogs">
          <button className="explore-button">Explore Blogs</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
