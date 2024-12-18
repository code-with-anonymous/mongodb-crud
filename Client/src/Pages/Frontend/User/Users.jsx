// import React, { useState} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Users() {
//   const initialState = {
//     email: "",
//     password: "",
//     confirmPassword: "",
//     fullName: "",
//   };

//   const [state, setState] = useState(initialState);
//   const [users, setUsers] = useState([]); // Added state for users

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value.trim(),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password, confirmPassword, fullName } = state;

//     if (
//       password.length <= 3 ||
//       confirmPassword.length <= 3 ||
//       fullName.length <= 3
//     ) {
//       toast.error(
//         "Fields must be greater than 3 characters long, except email."
//       );
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     let formData = {
//       email,
//       password,
//       fullName,
//       status: "active",
//       DateCreated: new Date().toISOString(),
//     };

//     axios
//       .post("http://localhost:8000/createUser", formData)
//       .then((res) => {
//         setState(initialState);
//         setUsers([...users, formData]); // Update users state with new registration
//         toast.success("User registered successfully!");
//         console.log("res", res);
//       })
//       .catch((err) => {
//         console.error("Error:", err.message || err);
//         toast.error("Failed to register user.");
//       });

//     console.log("Form submitted:", state);
//     console.log('formData', formData)
//   };

//   return (
//     <div className="bg-img">
//     <div className="d-flex justify-content-center align-items-center vh-100 ">
//       <div
//         className="container "
//         style={{
//           width:"460px"
//         }}
//       >
//         <h2 className="text-center text-danger mb-4">User Registration</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="fullName" className="form-label text-white fs-4">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               className="form-control"
//               placeholder="Enter your full name"
//               onChange={handleChange}
//               value={state.fullName}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="email" className="form-label text-white fs-4">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-control"
//               placeholder="Enter your email"
//               onChange={handleChange}
//               value={state.email}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label text-white fs-4">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-control"
//               placeholder="Enter your password"
//               onChange={handleChange}
//               value={state.password}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label
//               htmlFor="confirmPassword"
//               className="form-label text-white fs-4"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className="form-control"
//               placeholder="Confirm your password"
//               onChange={handleChange}
//               value={state.confirmPassword}
//               required
//             />
//           </div>

//           <div className="d-flex justify-content-center">
//             <button type="submit" className="btn btn-lg btn-light">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

//     </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Users() {
  const initialState = {
    title: "",
    price: "",
    description: "",
  };

  const [state, setState] = useState(initialState);
  const [todo, setTodo] = useState([]); // Added state for todo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, description } = state;

    if (title.length <= 3 || description.length <= 3) {
      toast.error("Fields must be greater than 4 characters long.");
      return;
    }

    let formData = {
      title,
      price,
      description,
      status: "active",
      DateCreated: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8000/createUser", formData)
      .then((res) => {
        setState(initialState);
        setTodo([...todo, formData]);
        toast.success("Todo is added successfully!");
        console.log("res", res);
      })
      .catch((err) => {
        console.error("Error:", err.message || err);
        toast.error("Failed to add Todo user.");
      });

    console.log("Form submitted:", state);
    console.log("formData", formData);
  };

  return (
    <div className="bg-img">
      <div className="d-flex justify-content-center align-items-center vh-100 ">
        <div
          className="container"
          style={{
            width: "460px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important" , // Corrected key: boxShadow
          }}
        >
          <h1 className="text-center text-white mb-4">Add Task</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="  form-label text-white fs-4">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter your the title"
                onChange={handleChange}
                value={state.title}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label text-white fs-4">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="form-control"
                placeholder="Enter your price"
                onChange={handleChange}
                value={state.price}
                required
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label text-white fs-4"
              >
                Description
              </label>
              <textarea
                type="description"
                id="description"
                name="description"
                className="form-control"
                placeholder="Enter your description"
                onChange={handleChange}
                value={state.description}
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-lg btn-light">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
