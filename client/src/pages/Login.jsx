// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useApi } from "../Context/ApiContext";

const Login = () => {

    const { BASE_URL } = useApi();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      console.log("Login successful:", response.data);

     // Inside handleSubmit success block
localStorage.setItem("token", response.data.token);
localStorage.setItem("username", response.data.result.username);
localStorage.setItem("userId", response.data.result._id);


navigate("/dashboard");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Expense Tracker</h2>
        <h4 className="text-center mb-4">Login</h4>

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              required

            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              autoComplete="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">Login</button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
