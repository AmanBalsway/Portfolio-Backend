// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = decoded; // you can use req.user.adminId if needed
    next();
  } catch (err) {
    console.error('JWT Error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
