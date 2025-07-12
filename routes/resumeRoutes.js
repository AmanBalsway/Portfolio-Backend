import express from 'express';
import { uploadResume, getResume } from '../controllers/resumeController.js';
import { uploadResumeFile } from '../middleware/multer.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, uploadResumeFile.single('resume'), uploadResume);
router.get('/', getResume);

export default router;


