import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure toastify is imported
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const initialState = { fullName: "", email: "", password: "" };
const Register = () => {
  const navigate = useNavigate();
  const [input, setinput] = useState(initialState);

  const handleChange = (e) =>
    setinput((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        input
      ); 

      if (response.data.success) {
        toast.success("User registered successfully!");
        setinput(initialState)
        navigate("/auth/login");
      } else {
        // Show error toast
        toast.error(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (err) {
      console.error(err);

      // Show error toast for any server or network issues
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <section
      className=" bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control form-control-lg"
                        name="fullName"
                        value={input.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={input.email}
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={input.password}
                        required
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account?{" "}
                      <Link to="/auth/login" className="fw-bold text-body">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
