// src/pages/Register.jsx
import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', values);
      message.success('🎉 Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      message.error(err.response?.data?.message || '❌ Đăng ký thất bại!');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card
        title="🔐 Tạo tài khoản"
        style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>
          <p style={{ textAlign: 'center' }}>
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
