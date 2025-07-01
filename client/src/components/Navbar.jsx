// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); // Save username on login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">💰 ExpenseTracker</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Transaction</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reports">Reports</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {token ? (
            <>
              <li className="nav-item">
                <span className="navbar-text text-white me-3">
                  👋 Hello, {username || "User"}
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

