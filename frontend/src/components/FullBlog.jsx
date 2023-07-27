import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const FullBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      setBlog(response.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      ) : (
        <ul className="container-content">
          <li key={blog._id} className="blog">
            <h3 className="title">
              {blog.title}{' '}
              <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.10)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </h3>
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
        </ul>
      )}
    </div>
  );
};

export default FullBlog;
