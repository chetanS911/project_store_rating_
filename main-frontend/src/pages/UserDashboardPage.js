import React, { useState, useEffect, useCallback } from 'react';
import storeService from '../services/storeService';
import StoreCard from '../components/StoreCard';

const UserDashboardPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStores = useCallback(async () => {
    try {
      setLoading(true);
      const response = await storeService.getAllStores(searchTerm);
      setStores(response.data);
    } catch (err) {
      setError('Failed to fetch stores.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]); 

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleRateStore = async (storeId, rating) => {
    try {
      await storeService.rateStore(storeId, rating);
      alert('Rating submitted successfully!');

      fetchStores(); 
    } catch (err) {
      alert('Failed to submit rating: ' + (err.response?.data?.message || 'Server error'));
    }
  };
  
  const handleSearch = (e) => {
      e.preventDefault();
      fetchStores();
  };

  if (loading) return <div>Loading stores...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Stores</h2>
      
      <form onSubmit={handleSearch}>
        <input 
            type="text" 
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '300px', padding: '8px'}}
        />
        <button type="submit">Search</button>
      </form>
      
      <div>
        {stores.length > 0 ? (
          stores.map((store) => (
            <StoreCard key={store.id} store={store} onRate={handleRateStore} />
          ))
        ) : (
          <p>No stores found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;