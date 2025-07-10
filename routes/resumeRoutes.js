import express from 'express';
import multer from 'multer';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import verifyToken from '../middleware/authMiddleware.js';
import Resume from '../models/Resume.js';

const router = express.Router();
const upload = multer({ dest: 'temp/' });

// POST /api/resume — upload + save in DB
router.post('/', verifyToken, upload.single('resume'), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.path, 'Portfolio/Resume');

    // Save new resume, remove previous ones if needed
    await Resume.deleteMany(); // only latest one stored
    const newResume = await Resume.create({ url: result.secure_url });

    res.status(201).json({ success: true, url: newResume.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/resume — fetch latest resume
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }
    res.status(200).json({ success: true, url: resume.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
