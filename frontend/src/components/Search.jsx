import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSearchInput from '../hooks/useSearchInput';

const Search = () => {
  const inputRef = useRef();
  const {
    query,
    setQuery,
    results,
    loading,
    handleSearch,
    handleKeyPress,
    inputRef: forwardedInputRef,
  } = useSearchInput(inputRef);

  useEffect(() => {
    forwardedInputRef.current.focus();
  }, [forwardedInputRef]);

  return (
    <div className="container">
      <div className="container-title">
        <div className="search-container">
          <input
            ref={forwardedInputRef}
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
              <h3 className="title">
                <Link className="to-blog-details" to={`/blog/${blog._id}`}>
                  {blog.title}
                </Link>
              </h3>
              <p className="author">
                <strong>Author:</strong> {blog.author}
              </p>
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
