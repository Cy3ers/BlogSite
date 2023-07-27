import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
              <h3 className="title">{blog.title}</h3>
              <p className="author">
                <strong>Author:</strong> {blog.author}
              </p>
              <p className="content">{blog.content}</p>
              <p className="tags">
                <strong>Tags:</strong> {blog.tags.join(', ')}
              </p>
              <h4>Comments:</h4>
              <ul className="comment-list">
                {blog.comments && blog.comments.length > 0 ? (
                  blog.comments.map((comment) => (
                    <li className="comment-content" key={comment._id}>
                      {comment.content}
                    </li>
                  ))
                ) : (
                  <li className="no-comments">No comments yet.</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
