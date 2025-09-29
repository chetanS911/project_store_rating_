// src/pages/OwnerDashboardPage.js (Updated)
import React, { useState, useEffect } from 'react';
import ownerService from '../services/ownerService';

const OwnerDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await ownerService.getDashboardData();
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      
      {dashboardData ? (
        <div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3>{dashboardData.storeDetails.name}</h3>
            <p>{dashboardData.storeDetails.address}</p>
            <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '300px' }}>
              <h4>Store Statistics</h4>
              <p>
                <strong>Average Rating:</strong> {dashboardData.dashboardStats.averageRating} / 5.00
              </p>
              <p>
                <strong>Total Ratings:</strong> {dashboardData.dashboardStats.totalRatings}
              </p>
            </div>
          </div>

          <div>
            <h3>Users Who Rated Your Store</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Rating Given</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.ratings.map((rating) => (
                  <tr key={rating.id}>
                    <td>{rating.User.name}</td>
                    <td>{rating.User.email}</td>
                    <td>{rating.rating} ★</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No dashboard data available.</p>
      )}
    </div>
  );
};

export default OwnerDashboardPage;