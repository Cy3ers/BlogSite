import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';

const FullBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      setBlog(response.data);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios
        .delete(`http://localhost:5000/api/posts/${id}`)
        .then((response) => {
          console.log(response.data.message);
          navigate('/Blogs');
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

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
              <Link to={`/editBlog/${blog._id}`}>
                <BiEdit
                  style={{ color: 'gray', cursor: 'pointer' }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = 'scale(1.10)')
                  }
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  onClick={Link}
                />
              </Link>
              <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.10)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                onClick={handleDelete}
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
