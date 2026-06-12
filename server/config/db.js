const mongoose = require('mongoose');

let isConnected = false;

// Handle connection events to prevent unhandled rejections/crashes
mongoose.connection.on('connected', () => {
  isConnected = true;
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err.message}`);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
});

const connectDB = async () => {
  try {
    // Set bufferCommands to false so that queries fail instantly when database is down
    mongoose.set('bufferCommands', false);
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow', {
      serverSelectionTimeoutMS: 3000 // Fast fail in 3 seconds
    });
    console.log('MongoDB Connected successfully');
    isConnected = true;
  } catch (error) {
    console.error(`Initial MongoDB connection failed: ${error.message}`);
    console.error('Please ensure MongoDB is running locally, or configure a MONGO_URI in server/.env.');
    isConnected = false;
  }
};

const getStatus = () => isConnected;

module.exports = { connectDB, getStatus };
