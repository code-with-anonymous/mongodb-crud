const express = require("express");
const app = express();
const dotenv =require("dotenv");
dotenv.config()

// Middleware for parsing cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Connect to MongoDB using an async function.
const dbConnect = require("./utlis/db.js");
dbConnect();

// Routes for authentication
const routes =require("./routes/Router.js")
const cors = require("cors");

const todoModel=require("./models/users");
const routers = require("./routes/Router.js");


app.use(cors({
  origin: ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
// Middleware for parsing JSON
app.use(express.json());
app.use('/api', routers);
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// handle get request with hello message

app.get("/", (req, res) => {
  res.send("Hello, welcome to our API!");
});
// Handle POST request to the root route
app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new todoModel(user);

  try {
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error); // Log the detailed error
    res.status(500).json({ error: error.message || "Failed to create user" });
  }
});

app.get("/readUsers", async(request, response) => {
  const users= await todoModel.find()
  response.send(users)
});

app.post("/updateUser", async (req, res) => {
  const updatedUser = req.body;
  let data = {...updatedUser}
  delete data._id

  await todoModel.findByIdAndUpdate(data._id,data)
  res.send("User is updated")
});

app.post("/deleteUser", async (req, res) => {
  const user = req.body;
  await todoModel.findByIdAndDelete(user._id)
  res.send("User is deleted")
});
app.listen(process.env.PORT, () => {
  console.log("Server is running perfectly on port", process.env.PORT);
});
