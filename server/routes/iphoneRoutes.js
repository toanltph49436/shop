// server/routes/iphoneRoutes.js
import express from 'express';
import {
  getAlliPhones,
  getiPhoneById,
  createiPhone,
  updateiPhone,
  deleteiPhone
} from '../controllers/iphoneController.js';

const router = express.Router();

router.get('/', getAlliPhones);
router.get('/:id', getiPhoneById);
router.post('/', createiPhone);
router.put('/:id', updateiPhone);
router.delete('/:id', deleteiPhone);

export default router;
