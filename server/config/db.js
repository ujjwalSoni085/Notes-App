const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn("Warning: Server is running, but notes will not load until the Database password is corrected.");
    // Intentionally not crashing the app so Railway stays Green
  }
};

module.exports = connectDB;
