const mongoose = require("mongoose");

/**
 * Connect to MongoDB using an async function.
 */
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Full error details:", error);
    throw error; // Re-throw the error for handling by the caller
  }
};

module.exports = connectToDatabase;
