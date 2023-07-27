import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then((response) => {
      setBlogs(response.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="container-title">Blog List</h1>
      {loading ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      ) : (
        <ul className="container-content">
          {blogs.map((blog) => (
            <li key={blog._id} className="blog">
              <h3 className="title">
                <Link className="to-blog-details" to={`/blog/${blog._id}`}>
                  {blog.title}
                </Link>{' '}
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

export default BlogList;
