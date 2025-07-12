import express from 'express';
import { uploadProject, getAllProjects } from '../controllers/projectController.js';
import { uploadImage } from '../middleware/multer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', authMiddleware, uploadImage.single('image'), uploadProject);

export default router;
