// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/iphones')
      .then(res => setProducts(res.data.data || res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>📱 Danh sách iPhone</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: '1px solid #ddd', padding: 10, width: 200 }}>
            <h4>{p.model}</h4>
            <p>Màu: {p.color}</p>
            <p>{Number(p.price).toLocaleString()} đ</p>
            <Link to={`/product/${p._id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
