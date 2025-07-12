import express from 'express';
import { uploadImage } from '../middleware/multer.js';
import verifyToken from '../middleware/authMiddleware.js'; // ✅ Correct import
import { addTestimonial, getTestimonials } from '../controllers/testimonialController.js';

const router = express.Router();

// ✅ Use the correct middleware
router.post('/', verifyToken, uploadImage.single('image'), addTestimonial);
router.get('/', getTestimonials);

export default router;
