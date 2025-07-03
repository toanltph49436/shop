import express from 'express';
import Iphone from '../models/Iphone.js';

const router = express.Router();

// Create iPhone
router.post('/', async (req, res) => {
  try {
    const iphone = await Iphone.create(req.body);
    res.status(201).json(iphone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all iPhones
router.get('/', async (req, res) => {
  try {
    const iphones = await Iphone.find();
    res.json(iphones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one iPhone
router.get('/:id', async (req, res) => {
  try {
    const iphone = await Iphone.findById(req.params.id);
    if (!iphone) return res.status(404).json({ message: 'Not found' });
    res.json(iphone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update iPhone
router.put('/:id', async (req, res) => {
  try {
    const updated = await Iphone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete iPhone
router.delete('/:id', async (req, res) => {
  try {
    await Iphone.findByIdAndDelete(req.params.id);
    res.json({ message: 'iPhone deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
