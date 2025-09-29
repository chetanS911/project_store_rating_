import api from './api';

const getAllStores = (searchTerm = '') => {
  return api.get(`/stores?search=${searchTerm}`);
};

const rateStore = (storeId, rating) => {
  return api.post(`/stores/${storeId}/rate`, { rating });
};

const storeService = {
  getAllStores,
  rateStore,
};

export default storeService;