import api from './api';

const getDashboardData = () => {
  return api.get('/owner/dashboard');
};

const ownerService = {
  getDashboardData,
};

export default ownerService;