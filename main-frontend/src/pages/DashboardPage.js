import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.user) {
      const userRole = user.user.role;
      console.log('Redirecting user with role:', userRole);

      switch (userRole) {
        case 'SYSTEM_ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'STORE_OWNER':
          navigate('/owner/dashboard');
          break;
        case 'NORMAL_USER':
          navigate('/stores');
          break;
        default:
          navigate('/login');
      }
    }
  }, [user, navigate]);


  return <div>Loading...</div>;
};

export default DashboardPage;