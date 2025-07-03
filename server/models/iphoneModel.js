// server/models/iphoneModel.js
import mongoose from 'mongoose';

const iphoneSchema = new mongoose.Schema({
  model: { type: String, required: true },
  color: { type: String, required: true },
  storage: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  condition: { type: String, enum: ['new', 'used'], default: 'new' },
  isLocked: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('iPhone', iphoneSchema);
