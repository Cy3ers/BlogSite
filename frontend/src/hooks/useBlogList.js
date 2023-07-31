import { useState, useEffect } from 'react';
import axios from 'axios';

const useBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts').then((response) => {
      setBlogs(response.data);
      setLoading(false);
    });
  }, []);

  return {
    blogs,
    setBlogs,
    loading,
    setLoading,
  };
};

export default useBlogList;
