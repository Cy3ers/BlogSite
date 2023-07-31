import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      const { title, content, tags } = response.data;
      setTitle(title);
      setContent(content);
      setTags(tags.join(', '));
      setLoading(false);
    });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a blog object with the updated form data
    const blogData = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    // Send the updated blog data to the server
    axios
      .put(`http://localhost:5000/api/posts/edit/${id}`, blogData)
      .then((response) => {
        setSuccessMessage('Blog updated successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="edit-blog-body">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <h1 className="container-title">Edit Blog</h1>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-box"
                placeholder="Enter blog title"
              />
            </div>
            <div className="form-group">
              <label>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="input-box textarea"
                placeholder="Enter blog content"
              />
            </div>
            <div className="form-group-tags">
              <label>
                Tags (comma-separated):{' '}
                <div className="examples">
                  example-tag1,example-tag2,example-tag3,...
                </div>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="input-box"
                placeholder="Enter tags"
              />
            </div>
            <button type="submit" className="add-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
