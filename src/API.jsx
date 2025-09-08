// src/API.jsx
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://nihonga-backend.onrender.com',
});

export const BASE_URL = API.defaults.baseURL; // <-- Add this

// User APIs
export const userAPI = {
  login: (data) => API.post('/api/user/login', data),
  create: (data) => API.post('/api/user/post', data),
  update: (id, data) => API.put(`/api/user/update/${id}`, data),
  get: (id) => API.get(`/api/user/${id}`),
};

export const collectionAPI = {
  getAll: () => API.get('/api/collections/getall'),
  getById: (id) => API.get(`/api/collections/get/${id}`),
};

export const heroAPI = {
  getAll: () => API.get('/api/hero'),
};

export const productAPI = {
  getAll: () => API.get('/api/products'),
  getById: (id) => API.get(`/api/products/get/${id}`), // <-- added this for detail page
  create: (data) => API.post('/api/products', data),
};

export const cartAPI = {
  get: (userId) => API.get(`/api/cart/${userId}`),
  add: (payload) => API.post('/api/cart/add', payload),
  updateQty: (payload) => API.put('/api/cart/qty', payload),
  remove: (payload) => API.delete('/api/cart/remove', { data: payload }),
  clear: (userId) => API.delete(`/api/cart/clear/${userId}`),
};

export const orderAPI = {
  place: (payload) => API.post('/api/orders/place', payload),
  getByUser: (userId) => API.get(`/api/orders/user/${userId}`),
  getById: (orderId) => API.get(`/api/orders/${orderId}`),
};

export default API;
