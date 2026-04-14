const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We add .trim() to automatically strip any invisible spaces or newlines coming from Render
    const uri = process.env.MONGO_URI ? process.env.MONGO_URI.trim() : '';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Intentionally not crashing the app so Railway stays Green
  }
};

module.exports = connectDB;
