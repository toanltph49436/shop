import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/iphones/${id}`)
      .then(res => setPhone(res.data))
      .catch(err => console.log('❌ Lỗi khi tải chi tiết:', err));
  }, [id]);

  if (!phone) return <p style={{ textAlign: 'center' }}>🔄 Đang tải...</p>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* Ảnh sản phẩm */}
        <div style={{ flex: '1 1 400px' }}>
          <img
            src={phone.image || 'https://via.placeholder.com/400x400?text=No+Image'}
            alt={phone.model}
            style={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
              borderRadius: 12,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div style={{ flex: '1 1 500px' }}>
          <h1 style={{ fontSize: 28, marginBottom: 10 }}>{phone.model}</h1>
          <p style={{ fontSize: 16, color: '#555' }}>Màu: {phone.color}</p>
          <p>Dung lượng: <strong>{phone.storage}</strong></p>

          <div style={{ margin: '16px 0' }}>
            <span style={{
              padding: '6px 12px',
              background: phone.condition === 'new' ? '#28a745' : '#ffc107',
              color: '#fff',
              borderRadius: 5,
              marginRight: 10
            }}>
              {phone.condition === 'new' ? 'Mới' : 'Đã dùng'}
            </span>
            <span style={{
              padding: '6px 12px',
              background: phone.isLocked ? '#dc3545' : '#007bff',
              color: '#fff',
              borderRadius: 5
            }}>
              {phone.isLocked ? 'Khoá mạng' : 'Quốc tế'}
            </span>
          </div>

          <p style={{ fontSize: 22, fontWeight: 'bold', color: '#e60000' }}>
            {Number(phone.price).toLocaleString()} đ
          </p>

          <p style={{ marginTop: 16 }}>{phone.description || 'Không có mô tả chi tiết.'}</p>

          <div style={{ display: 'flex', gap: 16, marginTop: 30 }}>
            <button
              style={{
                padding: '12px 24px',
                background: '#f57c00',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              🛒 Thêm vào giỏ
            </button>
            <button
              style={{
                padding: '12px 24px',
                background: '#e60023',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                cursor: 'pointer'
              }}
            >
              ⚡ Mua ngay
            </button>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link to="/" style={{ color: '#007bff' }}>← Quay về trang chủ</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
