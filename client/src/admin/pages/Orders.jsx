import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag, Typography, message } from 'antd';

const { Title } = Typography;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (err) {
      message.error('Lỗi khi tải đơn hàng!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (price) => <strong style={{ color: '#e60000' }}>{Number(price).toLocaleString()} đ</strong>,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'items',
      key: 'items',
      render: (items) => (
        <ul style={{ paddingLeft: 16 }}>
          {items.map((item, index) => (
            <li key={index}>
              {item.model} - {item.color} - {item.storage}
              <Tag color="blue" style={{ marginLeft: 8 }}>
                {Number(item.price).toLocaleString()} đ
              </Tag>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>📦 Quản lý đơn hàng</Title>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Orders;
