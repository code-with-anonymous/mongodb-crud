import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button } from "antd"; // Using Ant Design for modal

export default function Table() {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For opening edit modal
  const [editingUser, setEditingUser] = useState(null); // Store user being edited
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    status: "",
    password: "",
  }); // Form data for editing user

  // Fetch users when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:8000/readUsers")
      .then((res) => {
        setDocuments(res.data); // Store the user data in state
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  }, []);

  // Handle the deletion of a user
  const handleDelete = (user) => {
    axios
      .post("http://localhost:8000/deleteUser", user) // Adjust this endpoint to your backend API
      .then((res) => {
        if (res.data === "User is deleted") {
          const updatedDocuments = documents.filter(
            (doc) => doc._id !== user._id
          );
          setDocuments(updatedDocuments); // Update the state after deletion
        }
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  };

  // Handle the edit action
  const handleEdit = (user) => {
    setIsModalOpen(true); // Open the modal
    setEditingUser(user); // Set the user being edited
    setFormData({
      fullName: user.fullName,
      email: user.email,
      status: user.status,
      password: user.password || "", // Assuming password can be null or undefined
    });
  };

  // Handle form input change in the modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (save edited user)
  const handleSubmit = () => {
    const updatedUser = { ...editingUser, ...formData }; // Combine updated data
    axios
      .post("http://localhost:8000/updateUser", updatedUser) // Adjust this endpoint to your backend API
      .then((res) => {
        const updatedDocuments = documents.map((doc) =>
          doc._id === updatedUser._id ? updatedUser : doc
        );
        setDocuments(updatedDocuments); // Update the table with edited data
        setIsModalOpen(false); // Close the modal
      })
      .catch((err) => {
        console.log("Error updating user:", err);
      });
  };

  return (
    <div className="container">
      <div className="col py-5">
        <div className="row">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>SR NO</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>
                      {/* Edit Button */}
                      <button
                        className="btn btn-primary m-1"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      {/* Delete Button */}
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for editing user */}
      {editingUser && (
        <Modal
          title="Edit User"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
