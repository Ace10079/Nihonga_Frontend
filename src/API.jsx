import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Direct URL instead of process.env
});
//https://nihonga-backend.onrender.com
//http://localhost:5000

export const BASE_URL = API.defaults.baseURL;

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
  getById: (id) => API.get(`/api/products/get/${id}`),
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
export const wishlistAPI = {
  add: (payload) => API.post("/api/wishlist/add", payload),
  remove: (payload) => API.post("/api/wishlist/remove", payload),
  get: (userId) => API.get(`/api/wishlist/${userId}`),
};


export default API;