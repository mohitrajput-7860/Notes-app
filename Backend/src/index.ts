import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// --- START OF DEBUGGING CODE ---
// Let's print the environment variable to see what the server is actually getting.
console.log('--- DEBUG: Checking Environment Variables ---');
console.log('Value for MONGODB_URI:', process.env.MONGODB_URI);
console.log('-------------------------------------------');
// --- END OF DEBUGGING CODE ---

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hd-notes';

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('📪 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

