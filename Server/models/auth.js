const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  // user_id: { type: String, required: false, },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const authModel = mongoose.model("authModel", registrationSchema);
module.exports = authModel;
