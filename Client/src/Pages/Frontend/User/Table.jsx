// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { Modal } from "antd";


// export default function Table() {
//   const [documents, setDocuments] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // For opening edit modal
//   const [editingUser, setEditingUser] = useState(null); // Store user being edited
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     description: "",
//   }); // Form data for editing user

//   // Fetch users when the component loads
//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/readUsers")
//       .then((res) => {
//         setDocuments(res.data); // Store the user data in state
//       })
//       .catch((err) => {
//         console.log("Error fetching users:", err);
//       });
//   }, [documents]);

//   // Handle the deletion of a user
//   const handleDelete = (user) => {
//     axios
//       .post("http://localhost:8000/deleteUser", user) // Adjust this endpoint to your backend API
//       .then((res) => {
//         if (res.data === "User is deleted") {
//           const updatedDocuments = documents.filter(
//             (doc) => doc._id !== user._id
//           );
//           setDocuments(updatedDocuments); // Update the state after deletion
//         }
//       })
//       .catch((err) => {
//         console.log("Error deleting user:", err);
//       });
//   };

//   // Handle the edit action
//   const handleEdit = (user) => {
//     setIsModalOpen(true); // Open the modal
//     setEditingUser(user); // Set the user being edited
//     setFormData({
//       fullName: user.fullName,
//       email: user.email,
//       status: user.status,
//       password: user.password || "", // Assuming password can be null or undefined
//     });
//   };

//   // Handle form input change in the modal
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission (save edited user)
//   const handleSubmit = () => {
//     const updatedUser = { ...editingUser, ...formData }; // Combine updated data
//     axios
//       .post("http://localhost:8000/updateUser", updatedUser) // Adjust this endpoint to your backend API
//       .then((res) => {
//         const updatedDocuments = documents.map((doc) =>
//           doc._id === updatedUser._id ? updatedUser : doc
//         );
//         setDocuments(updatedDocuments); // Update the table with edited data
//         setIsModalOpen(false); // Close the modal
//       })
//       .catch((err) => {
//         console.log("Error updating user:", err);
//       });
//   };

//   return (
//     <>
//       {/* <div className="container">
//         <div className="row">
//           <div className="col">
//             <form class="form-inline my-2 my-lg-0">
//               <input
//                 class="form-control mr-sm-2 w-75"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <button
//                 class="btn btn-outline-success my-2 my-sm-0"
//                 type="submit"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         </div>
//       </div> */}
//       <DemoBlock title='search'>
//         <SearchBar   placeholder='search here' showCancelButton={() => true} />
//       </DemoBlock>
//       <div className="container">
//         <div className="col py-5">
//           <div className="row">
//             <div className="table-responsive">
//               <table className="table table-bordered">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th className="text-center fw-bold">SR NO</th>
//                     <th className="text-center fw-bold">Title</th>
//                     <th className="text-center fw-bold">Price</th>
//                     <th className="text-center fw-bold">Description</th>
//                     <th className="text-center fw-bold">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {documents.map((user, index) => (
//                     <tr key={user._id}>
//                       <td className="text-center fw-bold fs-5">{index + 1}</td>
//                       <td>{user.title}</td>
//                       <td>{user.price}</td>
//                       <td>{user.description}</td>
//                       <td>
//                         {/* Edit Button */}
//                         <button
//                           className="btn btn-primary m-1"
//                           onClick={() => handleEdit(user)}
//                         >
//                           Edit
//                         </button>
//                         {/* Delete Button */}
//                         <button
//                           className="btn btn-danger m-1"
//                           onClick={() => handleDelete(user)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Modal for editing user */}
//         {editingUser && (
//           <Modal
//             title="Edit User"
//             open={isModalOpen}
//             onOk={handleSubmit}
//             onCancel={() => setIsModalOpen(false)}
//           >
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="fullName" className="form-label">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   className="form-control"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="form-control"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="status" className="form-label">
//                   Status
//                 </label>
//                 <input
//                   type="text"
//                   id="status"
//                   name="status"
//                   className="form-control"
//                   value={formData.status}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//             </form>
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Input, Select } from "antd";

const { Search } = Input;
const { Option } = Select;

export default function Table() {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/readUsers")
      .then((res) => {
        setDocuments(res.data);
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  }, []);

  const handleDelete = (user) => {
    axios
      .post("http://localhost:8000/deleteUser", user)
      .then((res) => {
        if (res.data === "User is deleted") {
          const updatedDocuments = documents.filter(
            (doc) => doc._id !== user._id
          );
          setDocuments(updatedDocuments);
        }
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
  };

  const handleEdit = (user) => {
    setIsModalOpen(true);
    setEditingUser(user);
    setFormData({
      title: user.title,
      price: user.price,
      description: user.description,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedUser = { ...editingUser, ...formData };
    axios
      .post("http://localhost:8000/updateUser", updatedUser)
      .then(() => {
        const updatedDocuments = documents.map((doc) =>
          doc._id === updatedUser._id ? updatedUser : doc
        );
        setDocuments(updatedDocuments);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Error updating user:", err);
      });
  };

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
  };

  const handleSort = (value) => {
    setSortField(value);
    const sortedDocuments = [...documents].sort((a, b) => {
      if (value === "title") {
        return a.title.localeCompare(b.title);
      }
      if (value === "price") {
        return a.price - b.price;
      }
      if (value === "dateCreated") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });
    setDocuments(sortedDocuments);
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery) ||
      doc.description.toLowerCase().includes(searchQuery)
  );

  return (
    <>
<div className="container py-3">
  <div className="row mb-3 align-items-center">
    <div className="col-8 col-md-8 col-lg-9">
      <Search
        
        size="large"
        placeholder="Search by title"
        onSearch={handleSearch}
        allowClear
        enterButton
        style={{ width: "100%" }}
      />
    </div>
    <div className="col-4 col-md-4 col-lg-3 text-end">
      <Select
        size="medium"
        placeholder="Sort by"
        style={{ width: "75%" }}
        onChange={handleSort}
      >
        <Option value="title">Title</Option>
        <Option value="price">Price</Option>
        <Option value="dateCreated">Date</Option>
      </Select>
    </div>
  </div>



        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th className="text-center fw-bold">SR NO</th>
                <th className="text-center fw-bold">Title</th>
                <th className="text-center fw-bold">Price</th>
                <th className="text-center fw-bold">Description</th>
                <th className="text-center fw-bold">Date Created</th>
                <th className="text-center fw-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((user, index) => (
                <tr key={user._id}>
                  <td className="text-center fw-bold fs-5">{index + 1}</td>
                  <td>{user.title}</td>
                  <td>{user.price}</td>
                  <td>{user.description}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
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

      {editingUser && (
        <Modal
          title="Edit User"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

