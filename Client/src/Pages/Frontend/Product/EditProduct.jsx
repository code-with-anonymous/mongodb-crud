import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: "", // This will store the current image URL or file object
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product details by ID
    axios
      .get(`http://localhost:8000/api/readProduct`)
      .then((res) => {
        const selectedProduct = res.data.find((product) => product._id === id);
        if (selectedProduct) {
          const { name, description, price, imgUrl } = selectedProduct;
          setFormData({ name, description, price, imgUrl });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prevData) => ({
      ...prevData,
      imgUrl: file, // Update imgUrl with the file object
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare formData to send to backend
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    
    if (formData.imgUrl instanceof File) {
      formDataToSend.append("imgUrl", formData.imgUrl);
    } else {
      formDataToSend.append("imgUrl", formData.imgUrl); // If the image URL is not changed, send the current image URL
    }

    axios
      .put(`http://localhost:8000/api/editProduct/${id}`, formDataToSend)
      .then((res) => {
        console.log("Product updated successfully:", res);
        alert("Product updated successfully!");
        navigate("/product/add-product");
      })
      .catch((err) => {
        console.log("Error updating product:", err);
        alert("Failed to update product");
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="imgUrl">Upload Image</label>
          {formData.imgUrl && typeof formData.imgUrl === "string" && (
            <div>
              <img
                src={formData.imgUrl}
                alt="Product"
                style={{ maxWidth: "100px", marginBottom: "10px" }}
              />
              <p>Current Image</p>
            </div>
          )}
          <input
            type="file"
            id="imgUrl"
            name="imgUrl"
            onChange={handleFileChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
