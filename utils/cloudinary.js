import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localPath, folder) => {
  try {
    const ext = path.extname(localPath).toLowerCase();
    const isDocument = ['.pdf', '.doc', '.docx'].includes(ext);
    const resourceType = isDocument ? 'raw' : 'image';

    const result = await cloudinary.uploader.upload(localPath, {
      folder,
      resource_type: resourceType,
    });

    fs.unlinkSync(localPath);
    return result;
  } catch (err) {
    if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    throw err;
  }
};
export default cloudinary;