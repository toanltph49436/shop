import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(data);
  }, []);

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const orderData = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      total: total,
      items: cart.map(item => ({
        productId: item._id,
        model: item.model,
        color: item.color,
        storage: item.storage,
        price: item.price,
        image: item.image,
      }))
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      localStorage.removeItem('cart');
      alert('✅ Đơn hàng đã được ghi nhận!');
      navigate('/');
    } catch (err) {
      console.error('❌ Lỗi khi gửi đơn hàng:', err);
      alert('❌ Lỗi khi thanh toán, vui lòng thử lại!');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2 style={{ marginBottom: 20 }}>🧾 Xác nhận thanh toán</h2>

      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 30 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc' }}>
                <th style={{ textAlign: 'left', padding: 10 }}>Sản phẩm</th>
                <th style={{ textAlign: 'center' }}>Giá</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td style={{ padding: 10 }}>{item.model} - {item.color} - {item.storage}</td>
                  <td style={{ textAlign: 'center' }}>{Number(item.price).toLocaleString()} đ</td>
                </tr>
              ))}
              <tr style={{ fontWeight: 'bold', borderTop: '1px solid #ccc' }}>
                <td style={{ padding: 10 }}>Tổng cộng</td>
                <td style={{ textAlign: 'center' }}>{total.toLocaleString()} đ</td>
              </tr>
            </tbody>
          </table>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Họ và tên" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Số điện thoại" required />
            <textarea name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ giao hàng" required rows={3}></textarea>
            <button type="submit" style={{
              padding: '12px 20px',
              background: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 16,
              cursor: 'pointer',
              marginTop: 10
            }}>
              ✅ Xác nhận thanh toán
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
