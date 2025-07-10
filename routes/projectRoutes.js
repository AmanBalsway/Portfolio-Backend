import express from 'express';
import { uploadProject , getAllProjects} from '../controllers/projectController.js';
import upload from '../middleware/multer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ GET all projects (public route)
router.get('/', getAllProjects);

// Protected route with JWT and image upload
router.post('/', authMiddleware, upload.single('image'), uploadProject);

export default router;
