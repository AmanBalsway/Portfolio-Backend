import Testimonial from '../models/Testimonial.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

export const addTestimonial = async (req, res) => {
  try {
    const { name, position, message, rating } = req.body;
    const fileUrl = req.file.path;

    const testimonial = await Testimonial.create({
      name,
      position,
      message,
      rating,
      image: fileUrl,
    });

    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
