import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, InputNumber, Button, message, Popconfirm } from 'antd';

const userId = 'demo_user'; // 📝 Giả lập userId (sau này thay bằng auth)

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      message.error('Lỗi khi tải giỏ hàng!');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${userId}/${productId}`, { quantity });
      message.success('Cập nhật số lượng thành công!');
      fetchCart();
    } catch {
      message.error('Lỗi khi cập nhật!');
    }
  };

  const deleteItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
      message.success('Xoá sản phẩm khỏi giỏ!');
      fetchCart();
    } catch {
      message.error('Xoá thất bại!');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const columns = [
    {
      title: 'Model',
      dataIndex: ['productId', 'model'],
    },
    {
      title: 'Màu',
      dataIndex: ['productId', 'color'],
    },
    {
      title: 'Bộ nhớ',
      dataIndex: ['productId', 'storage'],
    },
    {
      title: 'Giá',
      dataIndex: ['productId', 'price'],
      render: (price) => `${Number(price).toLocaleString()} đ`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(val) => updateQuantity(record.productId._id, val)}
        />
      ),
    },
    {
      title: 'Thành tiền',
      render: (_, record) =>
        `${(record.productId.price * record.quantity).toLocaleString()} đ`,
    },
    {
      title: 'Xoá',
      render: (_, record) => (
        <Popconfirm
          title="Xoá sản phẩm khỏi giỏ?"
          onConfirm={() => deleteItem(record.productId._id)}
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2> Đơn hàng </h2>
      <Table
        dataSource={cart?.items || []}
        columns={columns}
        rowKey={(record) => record.productId._id}
        loading={loading}
        pagination={false}
        bordered
      />
      <div style={{ marginTop: 20, textAlign: 'right', fontWeight: 'bold' }}>
        Tổng tiền:{' '}
        {cart
          ? cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0).toLocaleString()
          : 0}{' '}
        đ
      </div>
    </div>
  );
};

export default Cart;
