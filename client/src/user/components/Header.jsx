// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ background: '#333', padding: '15px 20px', color: '#fff' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>📱 iPhone Shop</Link></h2>
        <div>
          <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Trang chủ</Link>
          <Link to="/cart" style={{ color: '#fff' }}>🛒 Giỏ hàng</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
