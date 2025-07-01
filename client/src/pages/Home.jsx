// src/pages/Home.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-light text-dark min-vh-100 d-flex align-items-top" 
    style={{
    backgroundImage: `url("/BackGround.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}>
      <Container className="text-center">
        <h1 className="mb-3 display-4 fw-bold">💰 Expense Tracker</h1>
        <p className="lead mb-4">
          Take control of your finances. Track your income and expenses, view reports, and manage your money smartly.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/login">
            <Button variant="primary" size="lg">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-dark" size="lg">Register</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Home;
