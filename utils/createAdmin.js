// scripts/createAdmin.js or any name you like
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await Admin.findOne({ username: 'admin' });

    if (existing) {
      console.log('⚠️ Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('passkey', 10);

      await Admin.create({
        username: 'admin',
        password: hashedPassword,
      });

      console.log('✅ Admin user created');
    }

    process.exit();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });
