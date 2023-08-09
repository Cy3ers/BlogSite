import { useState, useEffect } from 'react';
import { addBlog, getBlogList } from '../api/api';

const useBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getBlogList()
      .then((response) => {
        setBlogs(response.data);
        // setLoading(false);
      })
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      });
  }, []);

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
    blogs,
    setBlogs,
    loading,
    setLoading,
  };
};

export default useBlog;
