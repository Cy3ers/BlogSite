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
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>
              <strong>Author:</strong> {blog.author}
            </p>
            <p>
              <strong>Tags:</strong> {blog.tags.join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
