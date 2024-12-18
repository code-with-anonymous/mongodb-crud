const userModel =require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

// Register function
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Check for existing user
    const exitUser = await userModel.findOne({ email });
    if (exitUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashPasword = await bcrypt.hash(password,10)

    // Create new user
    const newUser = new userModel({ fullName, email, password: hashPasword });
    await newUser.save();

    res.status(200).json({success: true, msg: "User registered successfully", user: newUser})
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }

};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for existing user
    const registeredUser = await userModel.findOne({ email });
    if (!registeredUser) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const matchPassword = await bcrypt.compare(password, registeredUser.password);
    if (!matchPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Create and sign JWT token
    const token = jwt.sign(
      { id: registeredUser._id, email: registeredUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '3d' } // Token expiration time
    );

    console.log('token', token)

    // Set the token as a cookie
    res.cookie('authToken', token, {
      
        httpOnly: true, // Prevents client-side access
        secure: false,   // Ensures cookies are sent only over HTTPS
        sameSite: 'strict', // Restricts cross-origin usage
        maxAge: 72 * 60 * 60 * 1000 // 1 day in milliseconds
        
    });

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: registeredUser._id,
        email: registeredUser.email,
      }
    });

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

const authenticate = (req, res, next) => {
  const token = req.cookies.sessionId; // Access the cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};






// Export both functions
module.exports = { register, login , authenticate};
