import express from 'express';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    res.status(200).json({
      message: '✅ Image uploaded successfully',
      imageUrl: req.file.path,
    });
  } catch (err) {
    console.error('❌ Image Upload Error:', JSON.stringify(err, null, 2));
    res.status(500).json({
      message: 'Upload failed',
      error: err.message || JSON.stringify(err),
    });
  }
});

export default router;
