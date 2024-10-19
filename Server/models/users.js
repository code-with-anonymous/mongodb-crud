const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"], // Example of status values
  },
  password: {
    type: String,
    required: true,
  }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
