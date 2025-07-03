import mongoose from 'mongoose';

const iphoneSchema = new mongoose.Schema({
  model: { type: String, required: true },       // Ví dụ: iPhone 13 Pro Max
  color: { type: String, required: true },       // Ví dụ: Xanh dương
  storage: { type: String, required: true },     // Ví dụ: 128GB, 256GB
  price: { type: Number, required: true },       // Giá bán
  image: { type: String },                       // Link ảnh
  description: { type: String },                 // Mô tả chi tiết
  condition: { type: String, default: 'new' },   // new / used
  isLocked: { type: Boolean, default: false },   // true nếu là máy lock
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Iphone', iphoneSchema);
