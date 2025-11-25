import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // Add other course fields here if needed
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
