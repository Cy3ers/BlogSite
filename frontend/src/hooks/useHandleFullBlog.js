import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog, deleteBlog, deleteComment, addComment } from '../api/api';

const useHandleFullBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getBlog(id).then((response) => {
      setBlog(response.data);
      setComments(response.data.comments);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id)
        .then((response) => {
          console.log(response.data.message);
          navigate('/Blogs');
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
      .then((response) => {
        console.log(response.data.message);
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      addComment({
        blogId: id,
        content: comment,
      })
        .then((response) => {
          setComments([...comments, response.data]);
          setComment('');
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return {
    blog,
    loading,
    comment,
    setComment,
    comments,
    handleDelete,
    handleDeleteComment,
    handleAddComment,
  };
};

export default useHandleFullBlog;
