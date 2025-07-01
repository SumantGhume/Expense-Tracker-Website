// src/components/AddTransactionForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useApi } from "../Context/ApiContext";

const AddTransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "Expense",
    category: "",
    date: "",
    description: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();
  const { BASE_URL } = useApi();
  const categories = {
    Income: ["Salary", "Bonus", "Freelancing", "Investments"],
    Expense: ["Food", "Rent", "Bills", "Travel", "Shopping"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const userId = localStorage.getItem("userId");
      console.log("User ID: ",userId) // Set this during login
      if (!userId) return setError("User not logged in");

      const response = await axios.post(`${BASE_URL}/expenses/add`, {
        ...formData,
        userId,
      });

      setSuccess("Transaction added successfully!");
      setFormData({
        amount: "",
        type: "Expense",
        category: "",
        date: "",
        description: "",
      });
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Add Transaction</h3>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            placeholder="$0.000"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select name="type" value={formData.type} onChange={handleChange}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories[formData.type].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={2}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Add Transaction
        </Button>
      </Form>
    </div>
  );
};

export default AddTransactionForm;
