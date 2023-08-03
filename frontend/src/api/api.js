import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getBlog = (id) => {
  return axios.get(`${API_BASE_URL}/posts/${id}`);
};

export const getBlogList = () => {
  return axios.get(`${API_BASE_URL}/posts`);
};

export const addBlog = (blogData) => {
  return axios.post(`${API_BASE_URL}/posts`, blogData);
};

export const searchBlog = (query) => {
  return axios.get(`${API_BASE_URL}/posts/search?query=${query}`);
};

export const editBlog = ({ id, blogData }) => {
  return axios.put(`${API_BASE_URL}/posts/edit/${id}`, blogData);
};

export const deleteBlog = (id) => {
  return axios.delete(`${API_BASE_URL}/posts/${id}`);
};

export const addComment = (data) => {
  return axios.post(`${API_BASE_URL}/comments`, data);
};

export const deleteComment = (commentId) => {
  return axios.delete(`${API_BASE_URL}/comments/delete/${commentId}`);
};
