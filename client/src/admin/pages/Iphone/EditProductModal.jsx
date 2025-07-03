// src/admin/components/EditProductModal.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const EditProductModal = ({ visible, onCancel, onUpdate, product }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values) => {
    onUpdate(product._id, values);
  };

  return (
    <Modal
      open={visible}
      title="🛠️ Sửa sản phẩm"
      onCancel={onCancel}
      onOk={handleOk}
      okText="Cập nhật"
      cancelText="Huỷ"
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="model" label="Model" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Màu sắc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="storage" label="Dung lượng" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="isLocked" label="Khoá mạng" rules={[{ required: true }]}>
          <Select>
            <Option value={true}>Khoá mạng</Option>
            <Option value={false}>Quốc tế</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
