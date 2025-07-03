import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div style={{ width: 220, height: '100vh', backgroundColor: '#001529' }}>
      <div style={{ padding: 20, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
        📊 Admin Panel
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%' }}
      >
       <Menu.Item key="/admin" icon={<DashboardOutlined />}>
  <Link to="/admin">Dashboard</Link>
</Menu.Item>
<Menu.Item key="/admin/products" icon={<ShoppingOutlined />}>
  <Link to="/admin/products">Products</Link>
</Menu.Item>
<Menu.Item key="/admin/cart" icon={<ShoppingCartOutlined />}>
  <Link to="/admin/cart">Orders</Link>
</Menu.Item>
<Menu.Item key="/admin/users" icon={<UserOutlined />}>
  <Link to="/admin/users">Users</Link>
</Menu.Item>

      </Menu>
    </div>
  );
};

export default Sidebar;
