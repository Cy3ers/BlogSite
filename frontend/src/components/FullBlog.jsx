import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import useHandleFullBlog from '../hooks/useHandleFullBlog';

const FullBlog = () => {
  const {
    blog,
    loading,
    comment,
    setComment,
    comments,
    handleDelete,
    handleDeleteComment,
    handleAddComment,
  } = useHandleFullBlog();

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Karachi',
  };

  const date = new Date(blog.createdAt);

  const formattedDate = date.toLocaleString('en-US', dateOptions);

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
              {blog.title}
              <FaTimes className="delete-button" onClick={handleDelete} />
              <Link to={`/editBlog/${blog._id}`}>
                <BiEdit className="edit-button" />
              </Link>
            </h3>
            <p className="create-date">Created On: {formattedDate}</p>
            <p className="author">
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="content">
              {blog.content.split('\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <p className="tags">
              <strong>Tags:</strong> {blog.tags.join(', ')}
            </p>
            <h4>Comments:</h4>
            <ul className="comment-list">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <li className="comment-content" key={comment._id}>
                    {comment.content}
                    <FaTimes
                      className="delete-button"
                      onClick={() => handleDeleteComment(comment._id)}
                    />
                  </li>
                ))
              ) : (
                <li className="no-comments">No comments yet.</li>
              )}
            </ul>
            <div className="add-comment-container">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <button className="add-comment-button" onClick={handleAddComment}>
                Add Comment
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default FullBlog;
