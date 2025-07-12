import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

// Image uploader (projects, testimonials, etc.)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Portfolio/Images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
export const uploadImage = multer({ storage: imageStorage });

// Resume uploader
const resumeStorage = new CloudinaryStorage({
  
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split('.').pop().toLowerCase(); // get extension and convert to lower case
    const baseName = file.originalname.replace(/\.[^/.]+$/, ''); // remove extension
    // Validate file type
    const allowedFormats = ['pdf', 'doc', 'docx'];
    if (!allowedFormats.includes(ext)) {
      throw new Error('Invalid file type. Only PDF, DOC, and DOCX are allowed.');
    }
    return {
      folder: 'Portfolio/Resume',
      public_id: baseName,            // keep original filename
      format: ext,                    // set the correct format
      resource_type: 'raw',           // required for PDF/DOC
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    };
  },
});



export const uploadResumeFile = multer({ storage: resumeStorage });
