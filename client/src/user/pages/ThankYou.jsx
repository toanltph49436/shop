import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
    <h1>🎉 Cảm ơn bạn đã đặt hàng!</h1>
    <p>Chúng tôi sẽ liên hệ sớm để xác nhận đơn hàng của bạn.</p>
    <Link to="/" style={{ color: '#007bff' }}>← Quay lại trang chủ</Link>
  </div>
);

export default ThankYou;
