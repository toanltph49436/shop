// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/iphones')
      .then(res => setProducts(res.data.data || res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      {/* Banner Section */}
      <Banner />

      {/* Product Section */}
      <div style={{ maxWidth: '1200px', margin: '40px auto' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '28px' }}>📱 Danh sách iPhone</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {products.map((p) => (
            <div
              key={p._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                backgroundColor: '#fff',
              }}
            >
              <img
                src={p.image || 'https://via.placeholder.com/250x180?text=No+Image'}
                alt={p.model}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              />
              <h4 style={{ margin: '6px 0' }}>{p.model}</h4>
              <p>Màu: {p.color}</p>
              <p style={{ fontWeight: 'bold', color: '#e60000' }}>
                {Number(p.price).toLocaleString()} đ
              </p>
              <Link to={`/product/${p._id}`} style={{ color: '#007bff', textDecoration: 'none' }}>Xem chi tiết</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
