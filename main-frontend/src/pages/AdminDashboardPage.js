import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../services/adminService';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard stats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Total Stores</h3>
          <p>{stats.stores}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Total Ratings</h3>
          <p>{stats.ratings}</p>
        </div>
      </div>

      <div>
        <h3>Management</h3>
        <nav>
          <Link to="/admin/users">Manage Users</Link> | {' '}
          <Link to="/admin/stores">Manage Stores</Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboardPage;