const mongoose = require('mongoose');

const AcademicSessionSchema = new mongoose.Schema({
  sessionId: String,
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  description: String,
  department: String,
  batches: [{
    batchId: String,
    year: Number,
    department: String,
    courseDuration: Number,
    isActive: Boolean
  }]
});

const AcademicSession = mongoose.model('AcademicSession', AcademicSessionSchema);

async function createSessions() {
  try {
    await mongoose.connect('mongodb://localhost:27017/college');
    console.log('Connected to MongoDB');

    const departments = ['B.A', 'B.Sc', 'B.Ed'];
    const courseDurations = { 'B.A': 3, 'B.Sc': 3, 'B.Ed': 2 };

    for (const dept of departments) {
      const batches = [];
      const duration = courseDurations[dept];

      for (let year = 1; year <= duration; year++) {
        batches.push({
          batchId: `2024-25-${dept.replace('.', '')}-Year${year}`,
          year,
          department: dept,
          courseDuration: duration,
          isActive: true
        });
      }

      const session = new AcademicSession({
        sessionId: `2024-25-${dept.replace('.', '')}`,
        startDate: new Date('2024-07-01'),
        endDate: new Date('2025-06-30'),
        isActive: dept === 'B.A', // Make B.A active by default
        description: `Academic Session 2024-25 for ${dept}`,
        department: dept,
        batches
      });

      await session.save();
      console.log(`Created session for ${dept} with ${batches.length} batches`);
    }

    console.log('All sessions created successfully');
  } catch (error) {
    console.error('Error creating sessions:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createSessions();
