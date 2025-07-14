// src/API.jsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Hero Section APIs
export const heroAPI = {
  getAll: () => API.get('/api/heros'),
};

// Future example (product, collection etc.)
export const productAPI = {
  getAll: () => API.get('/api/products'),
  create: (data) => API.post('/api/products', data)
};

// etc.
