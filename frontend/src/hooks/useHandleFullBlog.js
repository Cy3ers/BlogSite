import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const useHandleFullBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      setBlog(response.data);
      setComments(response.data.comments);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios
        .delete(`http://localhost:5000/api/posts/${id}`)
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
    axios
      .delete(`http://localhost:5000/api/comments/delete/${commentId}`)
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
      axios
        .post(`http://localhost:5000/api/comments`, {
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
