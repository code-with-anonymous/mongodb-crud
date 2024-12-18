const express = require("express");
const routers = express.Router();
const { register, login } = require("../controllers/authController.js");
const { addProduct, getProducts, deleteProduct, editProduct } = require("../controllers/productController.js");
const { uploadedImage } = require("../middleware/multer.middleware.js");

// Routes for authentication
routers.post("/register", register);
routers.post("/login", login);

// Routes for product management

routers.post("/addProduct", uploadedImage.single("image"), addProduct);
routers.get("/readProduct", getProducts);
routers.delete("/deleteProduct/:_id",deleteProduct);
routers.put("/editProduct/:_id",uploadedImage.single("image"),editProduct);

// Example protected route

module.exports = routers;
