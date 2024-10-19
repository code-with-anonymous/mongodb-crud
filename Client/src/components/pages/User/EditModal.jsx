import React, { useState } from "react";
import axios from "axios";

export default function EditModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState(user); // Initialize form data with user data

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user on the server
    axios
      .post("http://localhost:8000/updateUser", formData) // Adjust the API call based on your server logic
      .then((res) => {
        if (res.data === "User updated successfully") {
          onUpdate(formData); // Update the user in the parent component
          onClose(); // Close the modal
        }
      })
      .catch((err) => {
        console.log("Error updating user", err);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Edit User</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
