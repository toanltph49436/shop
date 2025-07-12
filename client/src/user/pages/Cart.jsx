import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ thêm useNavigate

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // ✅ khởi tạo hàm điều hướng

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(stored);
  }, []);

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updated));
    setCartItems(updated);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handleCheckout = () => {
    navigate('/checkout'); // ✅ điều hướng tới trang thanh toán
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>🛒 Giỏ hàng trống</h2>
        <Link to="/" style={{ color: '#007bff' }}>← Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 30 }}>🛍️ Giỏ hàng của bạn</h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 20,
            borderBottom: '1px solid #ddd',
            paddingBottom: 15,
          }}
        >
          <img
            src={item.image}
            alt={item.model}
            style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: 5 }}>{item.model}</h3>
            <p style={{ margin: 0 }}>Màu: {item.color} | Dung lượng: {item.storage}</p>
            <p style={{ fontWeight: 'bold', color: '#e60000' }}>
              {Number(item.price).toLocaleString()} đ
            </p>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            style={{
              background: '#ff4d4f',
              color: '#fff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Xoá
          </button>
        </div>
      ))}

      <div style={{ textAlign: 'right', marginTop: 30 }}>
        <h2>Tổng: <span style={{ color: '#e60000' }}>{totalPrice.toLocaleString()} đ</span></h2>
        <button
          onClick={handleCheckout} // ✅ chuyển trang khi bấm nút
          style={{
            marginTop: 10,
            background: '#1890ff',
            color: '#fff',
            border: 'none',
            padding: '12px 30px',
            borderRadius: 8,
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          ✅ Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
