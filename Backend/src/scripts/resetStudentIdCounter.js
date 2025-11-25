import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Counter from '../models/Counter.js';

dotenv.config({ path: '../../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';

async function resetStudentIdCounter() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const result = await Counter.findOneAndUpdate(
      { name: 'studentId' },
      { value: 0 },
      { new: true, upsert: true }
    );

    if (result) {
      console.log('Successfully reset studentId counter to 0');
    } else {
      console.log('StudentId counter document not found, created new with value 0');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Failed to reset studentId counter:', error);
    process.exit(1);
  }
}

resetStudentIdCounter();
