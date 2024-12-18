const productModel = require("../models/product");
const { uploadOnCloudinary } = require("../utlis/cloudinary");

const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const { name, price, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    if (!name || !price || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingProduct = await productModel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists." });
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    if (!uploadedImage) {
      return res.status(500).json({ message: "Failed to upload image." });
    }

    // Save product to database
    const newProduct = new productModel({
      name,
      price,
      description,
      imgUrl: uploadedImage.secure_url,
    });
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product is added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add product.", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find(); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch products.", error: error.message });
  }
};

// delete product

const deleteProduct = async (req, res) => {

  try {
    const { _id } = req.params;
    console.log('Deleting product with ID:', _id);

    const deletedProduct = await productModel.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Failed to delete product.', error: error.message });
  }

};

// Edit product

const editProduct = async (req, res) => {
  console.log(req.params._id)
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    console.log(updatedProduct)
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: "Error updating product" });
  }

};




module.exports = { addProduct, getProducts,deleteProduct,editProduct };
