// src/pages/Login.jsx
import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      message.success('✅ Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      message.error(err.response?.data?.message || '❌ Đăng nhập thất bại!');
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
        title="🔑 Đăng nhập"
        style={{ width: 400, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
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
              Đăng nhập
            </Button>
          </Form.Item>
          <p style={{ textAlign: 'center' }}>
            Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
