import express from 'express';
import { getAllUsers } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getAllUsers);

export default router;
