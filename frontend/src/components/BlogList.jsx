import React from 'react';
import { Link } from 'react-router-dom';
import useBlog from '../hooks/useBlog';

const BlogList = () => {
  const { blogs, loading } = useBlog();

  return (
    <div className="container">
      <h1 className="container-title">Blog List</h1>
      {loading ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
        </div>
      ) : (
        <ul className="container-content">
          {blogs.map((blog) => (
            <li key={blog._id} className="blog">
              <h3 className="title">
                <Link className="to-blog-details" to={`/blog/${blog._id}`}>
                  {blog.title}
                </Link>{' '}
              </h3>
              <p className="author">
                <strong>Author:</strong> {blog.author}
              </p>
              <p className="tags">
                <strong>Tags:</strong> {blog.tags.join(', ')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
