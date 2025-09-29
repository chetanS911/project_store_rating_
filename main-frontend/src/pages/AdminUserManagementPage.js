import React, { useState, useEffect } from 'react';
import adminService from '../services/adminService';

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'NORMAL_USER', 
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await adminService.createUser(newUser);
      alert('User created successfully!');
      setNewUser({ name: '', email: '', password: '', address: '', role: 'NORMAL_USER' });
      fetchUsers();
    } catch (err) {
      alert('Failed to create user: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Manage Users</h2>

      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>Create New User</h3>
        <form onSubmit={handleCreateUser}>
          <input type="text" name="name" value={newUser.name} onChange={handleInputChange} placeholder="Name (min 20 chars)" required />
          <input type="email" name="email" value={newUser.email} onChange={handleInputChange} placeholder="Email" required />
          <input type="password" name="password" value={newUser.password} onChange={handleInputChange} placeholder="Password" required />
          <input type="text" name="address" value={newUser.address} onChange={handleInputChange} placeholder="Address" required />
          <select name="role" value={newUser.role} onChange={handleInputChange}>
            <option value="NORMAL_USER">Normal User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
          </select>
          <button type="submit">Create User</button>
        </form>
      </div>

      <h3>Existing Users</h3>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserManagementPage;