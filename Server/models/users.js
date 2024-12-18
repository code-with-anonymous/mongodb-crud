const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  }, 
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  });


const todoModel = mongoose.model("todos", UserSchema);

module.exports = todoModel;
