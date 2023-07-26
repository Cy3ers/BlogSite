import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaggedBlogs = () => {
  const { tag } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/tags/${tag}`)
      .then((response) => {
        setBlogs(response.data);
      });
  }, [tag]);

  return (
    <div>
      <h2>Blogs Tagged with "{tag}"</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Author: {blog.author}</p>
            <p>Tags: {blog.tags.join(', ')}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaggedBlogs;
