import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  total: { type: Number, required: true },
  items: [
    {
      productId: String,
      model: String,
      color: String,
      storage: String,
      price: Number,
      image: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
