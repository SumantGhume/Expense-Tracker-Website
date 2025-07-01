import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useApi } from "../Context/ApiContext";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    type: "Expense",
    category: "",
    date: "",
    description: "",
  });

  const { BASE_URL } = useApi();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const categories = {
    Income: ["Salary", "Bonus", "Freelancing", "Investments"],
    Expense: ["Food", "Rent", "Bills", "Travel", "Shopping"],
  };

  const userId = localStorage.getItem("userId");

  // Fetch the existing transaction
  const fetchTransaction = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/expenses/show/${userId}`);
      const transaction = res.data.find((t) => t._id === id);
      if (!transaction) throw new Error("Transaction not found");

      setFormData({
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date.slice(0, 10),
        description: transaction.description,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load transaction");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await axios.put(`http://localhost:5000/expenses/edit/${id}`, formData);
      setSuccess("Transaction updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setError("Error updating transaction");
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4">Edit Transaction</h3>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
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

        <Button variant="primary" type="submit" className="w-100">
          Update Transaction
        </Button>
      </Form>
    </div>
  );
};

export default EditExpense;
