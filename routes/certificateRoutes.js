import express from "express";
import {
  uploadCertificate,
  getCertificates,
} from "../controllers/certificateController.js";

import { uploadCertificateFile } from "../middleware/multer.js";

const router = express.Router();

// ✅ Use the Cloudinary storage version
router.post("/upload", uploadCertificateFile.single("image"), uploadCertificate);
router.get("/all", getCertificates);

export default router;
