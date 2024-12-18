import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from "bootstrap/js/dist/collapse";

const AppHeader = () => {

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarNav");

    if (navbarCollapse) {
      document.addEventListener("click", (e) => {
        const isTogglerClick = e.target.closest(".navbar-toggler");
        const isOutsideClick = !e.target.closest(".navbar-collapse");

        if (navbarCollapse.classList.contains("show") && isOutsideClick && !isTogglerClick) {
          const collapseInstance = Collapse.getInstance(navbarCollapse);
          collapseInstance?.hide();
        }
      });
    }

    return () => {
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Todo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/login">
                Login
              </Link>
            </li>
          </ul>
          <button className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
