import express from 'express';
import upload  from '../middleware/multer.js';
import verifyToken from '../middleware/authMiddleware.js'; // ✅ Correct import
import { addTestimonial, getTestimonials } from '../controllers/testimonialController.js';

const router = express.Router();

// ✅ Use the correct middleware
router.post('/', verifyToken, upload.single('image'), addTestimonial);
router.get('/', getTestimonials);

export default router;
