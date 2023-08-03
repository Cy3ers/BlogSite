import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { editBlog } from '../api/api';
import withDataFetching from '../HOCs/withDataFetching';

const EditBlog = ({ data }) => {
  const { id } = useParams();
  const { title, content, tags } = data;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updatedTags, setUpdatedTags] = useState(tags);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Create a blog object with the updated form data
    const blogData = {
      title: updatedTitle,
      content: updatedContent,
      tags: updatedTags.split(',').map((tag) => tag.trim()),
    };

    // Send the updated blog data to the server
    editBlog({ id, blogData })
      .then(() => {
        setSuccessMessage('Blog updated successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="edit-blog-body">
      <div className="container">
        <h1 className="container-title">Edit Blog</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              required
              className="input-box"
              placeholder="Enter blog title"
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
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
              value={updatedTags}
              onChange={(e) => setUpdatedTags(e.target.value)}
              className="input-box"
              placeholder="Enter tags"
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

export default withDataFetching(EditBlog);
