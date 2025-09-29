import api from './api';

const getDashboardStats = () => {
  return api.get('/admin/stats');
};

const getUsers = () => {
  return api.get('/admin/users');
};

const createUser = (userData) => {
  return api.post('/admin/users', userData);
};

const getStores = () => {
  return api.get('/admin/stores');
};

const createStore = (storeData) => {
  return api.post('/admin/stores', storeData);
};

const adminService = {
  getDashboardStats,
  getUsers,
  createUser,
  getStores, 
  createStore, 
};

export default adminService;