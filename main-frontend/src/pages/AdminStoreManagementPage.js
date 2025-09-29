import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminStoreManagementPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: '', 
  });

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await adminService.getStores();
      setStores(response.data);
    } catch (err) {
      setError('Failed to fetch stores.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStore({ ...newStore, [name]: value });
  };

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      await adminService.createStore(newStore);
      alert('Store created successfully!');
      setNewStore({ name: '', email: '', address: '', ownerId: '' }); 
      fetchStores(); 
    } catch (err) {
      alert('Failed to create store: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  if (loading) return <div>Loading stores...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Manage Stores</h2>

      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>Create New Store</h3>
        <form onSubmit={handleCreateStore}>
          <input type="text" name="name" value={newStore.name} onChange={handleInputChange} placeholder="Store Name" required />
          <input type="email" name="email" value={newStore.email} onChange={handleInputChange} placeholder="Store Email" required />
          <input type="text" name="address" value={newStore.address} onChange={handleInputChange} placeholder="Store Address" required />
          <input type="text" name="ownerId" value={newStore.ownerId} onChange={handleInputChange} placeholder="Owner ID (Optional)" />
          <button type="submit">Create Store</button>
        </form>
      </div>

      <h3>Existing Stores</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStoreManagementPage;