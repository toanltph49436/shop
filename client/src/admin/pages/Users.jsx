import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(() => alert('❌ Lỗi khi tải danh sách người dùng!'));
  }, []);

  const columns = [
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => new Date(date).toLocaleString()
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>👤 Danh sách người dùng đã đăng ký</h2>
      <Table dataSource={users} columns={columns} rowKey="_id" />
    </div>
  );
};

export default Users;
