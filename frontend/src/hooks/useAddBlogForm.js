import { useState } from 'react';
import { addBlog } from '../api/api';

const useAddBlogForm = () => {
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
    addBlog(blogData)
      .then(() => {
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

  return {
    title,
    setTitle,
    author,
    setAuthor,
    content,
    setContent,
    tags,
    setTags,
    successMessage,
    handleFormSubmit,
  };
};

export default useAddBlogForm;
