import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Iphone/Products';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders';
import Users from './pages/Users';
const AdminApp = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />

        </Routes>
      </div>
    </div>
  );
};

export default AdminApp;
