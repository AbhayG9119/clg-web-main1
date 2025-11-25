import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Counter from '../models/Counter.js';

dotenv.config({ path: '../../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';

async function initCounter() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await Counter.findOne({ name: 'studentId' });
    if (existing) {
      console.log('Counter for studentId already exists with value:', existing.value);
    } else {
      const counter = new Counter({ name: 'studentId', value: 0 });
      await counter.save();
      console.log('Counter for studentId initialized with value 0');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Failed to initialize counter:', error);
    process.exit(1);
  }
}

initCounter();
