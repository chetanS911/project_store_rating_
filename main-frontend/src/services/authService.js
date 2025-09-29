import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });

  if (response.data) {
    
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;