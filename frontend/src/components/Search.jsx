import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/posts/search?query=${query}`)
      .then((response) => {
        setResults(response.data);
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="container-title">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <i className="fa fa-search search-icon" onClick={handleSearch}></i>
        </div>
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      ) : (
        <ul className="container-content">
          {results.map((blog) => (
            <li key={blog._id} className="blog">
              <h3 className="title">{blog.title}</h3>
              <p className="author">
                <strong>Author:</strong> {blog.author}
              </p>
              <p className="content">{blog.content}</p>
              <p className="tags">
                <strong>Tags:</strong> {blog.tags.join(', ')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
