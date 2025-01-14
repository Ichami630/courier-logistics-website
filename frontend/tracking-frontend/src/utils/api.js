// src/utils/api.js
import axios from 'axios';

// Axios instance for backend communication
const api = axios.create({
  baseURL: 'http://tracking-website.local/backend', // Replace with your backend URL
});

// Include JWT token in Authorization header for protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
