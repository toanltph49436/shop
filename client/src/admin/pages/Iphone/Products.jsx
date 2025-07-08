import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
  InputNumber,
} from 'antd';
import EditProductModal from './EditProductModal';

const { Option } = Select;

const Products = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchModel, setSearchModel] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const fetchPhones = async (model = '') => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/iphones', {
        params: model ? { model } : {},
      });
      const data = res.data.data || res.data;
      setPhones(Array.isArray(data) ? data : []);
    } catch (err) {
      message.error('Lỗi khi tải sản phẩm!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/iphones/${id}`);
      message.success('Đã xoá sản phẩm!');
      fetchPhones();
    } catch {
      message.error('Xoá thất bại!');
    }
  };

  const handleAddProduct = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/iphones', values);
      message.success(`✅ Thêm sản phẩm thành công!`);
      setIsModalVisible(false);
      form.resetFields();
      fetchPhones();
    } catch (err) {
      message.error('❌ Lỗi khi thêm sản phẩm!');
    }
  };

  const handleUpdateProduct = async (id, values) => {
    try {
      await axios.put(`http://localhost:5000/api/iphones/${id}`, values);
      message.success('✅ Cập nhật sản phẩm thành công!');
      setIsEditVisible(false);
      setEditingProduct(null);
      fetchPhones();
    } catch (err) {
      message.error('❌ Cập nhật thất bại!');
    }
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <img
          src={url}
          alt="Ảnh"
          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
        />
      ),
    },
    {
      title: 'Model',
      dataIndex: 'model',
    },
    {
      title: 'Màu',
      dataIndex: 'color',
    },
    {
      title: 'Bộ nhớ',
      dataIndex: 'storage',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price) => `${Number(price).toLocaleString()} đ`,
    },
    {
      title: 'Khoá mạng',
      dataIndex: 'isLocked',
      render: (val) => (val ? 'Khoá' : 'Quốc tế'),
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Button onClick={() => {
            setEditingProduct(record);
            setIsEditVisible(true);
          }}>Sửa</Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>📱 Quản lý iPhone</h2>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo model..."
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
        />
        <Button onClick={() => fetchPhones(searchModel)}>Tìm kiếm</Button>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          ➕ Thêm sản phẩm
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={phones}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Modal thêm sản phẩm */}
      <Modal
        title="Thêm iPhone mới"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Thêm"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: 'Nhập model!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="color"
            label="Màu sắc"
            rules={[{ required: true, message: 'Nhập màu!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="storage"
            label="Dung lượng"
            rules={[{ required: true, message: 'Nhập dung lượng!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Nhập giá!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="isLocked"
            label="Khoá mạng?"
            rules={[{ required: true, message: 'Chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn">
              <Option value={true}>Khoá mạng</Option>
              <Option value={false}>Quốc tế</Option>
            </Select>
          </Form.Item>

          <Form.Item name="image" label="URL Ảnh">
            <Input placeholder="Dán đường dẫn ảnh sản phẩm" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal sửa sản phẩm */}
      <EditProductModal
        visible={isEditVisible}
        onCancel={() => {
          setIsEditVisible(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onUpdate={handleUpdateProduct}
      />
    </div>
  );
};

export default Products;
