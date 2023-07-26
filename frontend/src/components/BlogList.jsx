import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then((response) => {
      setBlogs(response.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="container-title">Blog List</h1>
      <ul className="container-content">
        {blogs.map((blog) => (
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
    </div>
  );
};

export default BlogList;
