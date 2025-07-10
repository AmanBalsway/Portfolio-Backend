// server/routes/authRoutes.js
import express from 'express';
import loginAdmin from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin); // POST /api/auth/login

export default router;
