// server/temp.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const createAdmin = async () => {
  const email = 'admin@example.com';
  const plainPassword = 'admin123';

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const newAdmin = new Admin({
    email,
    password: hashedPassword,
  });

  await newAdmin.save();
  console.log('✅ Admin created successfully!');
  process.exit(0);
};

createAdmin();
