import express from 'express';
import { protect } from '../middleware/auth.js';
import { searchStudents, getProfile, getStudentProfileById, updateProfile, updateStudentProfileById } from '../controllers/studentController.js';

const router = express.Router();

// Apply protect middleware to verify JWT and user
router.use(protect);

// Allow access to students, faculty, and admins for student search
router.get('/search', async (req, res, next) => {
  if (!['admin', 'faculty', 'student'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Insufficient role.' });
  }
  next();
}, searchStudents);

// Get logged-in student's profile
router.get('/profile', async (req, res, next) => {
  if (!['student', 'faculty', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied.' });
  }
  next();
}, getProfile);

// Update logged-in student's profile
router.put('/profile', async (req, res, next) => {
  if (!['student', 'faculty', 'admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied.' });
  }
  next();
}, updateProfile);

// Get another student's profile by ID (admin or owner student)
router.get('/profile/:studentId/student', async (req, res, next) => {
  if (!['admin', 'student'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied.' });
  }
  next();
}, getStudentProfileById);

// Update a student's profile by ID (admin only)
router.put('/profile/:studentId/student', async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
}, updateStudentProfileById);

export default router;
