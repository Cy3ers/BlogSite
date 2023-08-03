import { useState, useEffect } from 'react';
import { getBlogList } from '../api/api';

const useBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogList().then((response) => {
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
