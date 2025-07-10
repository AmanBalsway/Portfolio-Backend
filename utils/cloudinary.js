import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localPath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, { folder });
    fs.unlinkSync(localPath); // remove temp file
    return result;
  } catch (err) {
    fs.unlinkSync(localPath);
    throw err;
  }
};

export default cloudinary;
