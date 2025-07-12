import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const { name, email, phone, address, items, total } = req.body;
    const newOrder = new Order({ name, email, phone, address, items, total });
    await newOrder.save();
    res.status(201).json({ message: 'Tạo đơn hàng thành công!' });
  } catch (err) {
    console.error('Lỗi khi tạo đơn hàng:', err);
    res.status(500).json({ message: 'Tạo đơn hàng thất bại!' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Lỗi khi lấy đơn hàng:', err);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách đơn hàng' });
  }
};
