import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios
      .get(`http://localhost:5000/api/posts/search?query=${query}`)
      .then((response) => {
        setResults(response.data);
      });
  };

  return (
    <div>
      <h2>Search Blogs</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Author: {blog.author}</p>
            <p>Tags: {blog.tags.join(', ')}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
