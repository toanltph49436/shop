import express from 'express';
import Cart from '../models/cart.model.js'; // nhớ thêm .js khi dùng ES module

const router = express.Router();

// 1. Lấy giỏ hàng theo userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy giỏ hàng' });
  }
});

// 2. Thêm sản phẩm vào giỏ
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm vào giỏ hàng' });
  }
});

// 3. Xoá sản phẩm khỏi giỏ
router.delete('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });

    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xoá sản phẩm khỏi giỏ hàng' });
  }
});

// 4. Cập nhật số lượng sản phẩm
router.put('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });

    const item = cart.items.find(item => item.productId.equals(productId));
    if (!item) return res.status(404).json({ message: 'Sản phẩm không có trong giỏ' });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng' });
  }
});

export default router; // ✅ dùng default export
