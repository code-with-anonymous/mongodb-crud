import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const initialState = { email: "", password: "" };

export default function Login() {
  

  
  const [state, setState] = useState(initialState);
  const navigate = useNavigate()

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await axios.post(
        "http://localhost:8000/api/login", 
        state,
        { withCredentials: true } // Include this to send/receive cookies
      );
      const response = loginUser.data; 
      console.log(response);
      
      toast.success("User logged in successfully");
      navigate("/todo");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log in. Please try again.");
    }
  };
  
  
  return (
    <section className="bg-image bg-dark vh-100">
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
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={state.email}
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
                        value={state.password}
                        required
                        className="form-control form-control-lg"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-50"
                      >
                        login
                      </button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Don't have an account?{" "}
                      <Link to="/auth/register" className="fw-bold text-body">
                        <u>Register here</u>
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
}
