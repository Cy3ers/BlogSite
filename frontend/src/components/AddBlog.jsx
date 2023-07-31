import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a blog object with the form data
    const blogData = {
      title,
      author,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
    };

    // Send the blog data to the server
    axios
      .post('http://localhost:5000/api/posts', blogData)
      .then((response) => {
        setSuccessMessage('Blog added successfully!');
        setTitle('');
        setAuthor('');
        setContent('');
        setTags('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="add-blog-body">
      <div className="container">
        <h1 className="container-title">Add Blog</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-box"
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="input-box"
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="input-box textarea"
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
            />
          </div>
          <button type="submit" className="add-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
