const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
let monbgo_URl="mongodb+srv://rayyan:rayyan2023@cluster0.icscz.mongodb.net/RegisterUser?retryWrites=true&w=majority&appName=Cluster0"
const userModel=require("./models/users")
mongoose.connect(monbgo_URl)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use(cors());
app.use(express.json()); // Middleware for parsing JSON


// Handle POST request to the root route
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user);

  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error); // Log the detailed error
    res.status(500).json({ error: error.message || "Failed to create user" });
  }
});

app.get("/readUsers", async(request, response) => {
  const users= await userModel.find()
  response.send(users)
});

app.post("/updateUser", async (req, res) => {
  const updatedUser = req.body;
  let data = {...updatedUser}
  delete data._id

  await userModel.findByIdAndUpdate(data._id,data)
  res.send("User is updated")
});

app.post("/deleteUser", async (req, res) => {
  const user = req.body;
  await userModel.findByIdAndDelete(user._id)
  res.send("User is deleted")
});


// Start the serve
const Port = 8000;
app.listen(Port, () => {
  console.log("Server is running perfectly on port", Port);
});
