import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AdminUserManagementPage from './pages/AdminUserManagementPage';
import AdminStoreManagementPage from './pages/AdminStoreManagementPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />

          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute>
                <AdminUserManagementPage />
              </ProtectedRoute>
            } 
          />
          
     
          <Route 
            path="/admin/stores" 
            element={
              <ProtectedRoute>
                <AdminStoreManagementPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/owner/dashboard" 
            element={
              <ProtectedRoute>
                <OwnerDashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/stores" 
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            } 
          />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;