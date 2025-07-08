import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Giả lập user đăng nhập (sau này có thể dùng context hoặc redux để xử lý thực tế)
  const user = {
    name: 'Toàn Lê',
    avatar: 'https://i.pravatar.cc/40',
  };

  return (
    <header style={{
      background: '#1f1f1f',
      padding: '15px 30px',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        {/* Logo */}
        <div>
          <h2 style={{ margin: 0 }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
              📱 iPhone Shop
            </Link>
          </h2>
        </div>

        {/* Menu */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={linkStyle}>Trang chủ</Link>
          <Link to="/products" style={linkStyle}>Sản phẩm</Link>
          <Link to="/about" style={linkStyle}>Giới thiệu</Link>
          <Link to="/contact" style={linkStyle}>Liên hệ</Link>
          <Link to="/cart" style={linkStyle}>🛒 Giỏ hàng</Link>
        </div>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img
            src={user.avatar}
            alt="avatar"
            style={{ width: 35, height: 35, borderRadius: '50%' }}
          />
          <span>{user.name}</span>
          <button
            onClick={() => alert('Bạn đã đăng xuất!')}
            style={{
              marginLeft: 10,
              background: '#ff4d4f',
              border: 'none',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer'
            }}
          >
            Đăng xuất
          </button>
        </div>
      </nav>
    </header>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 500,
};

export default Header;
