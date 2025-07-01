import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const AddBalanceForm = () => {
  const [balance, setBalance] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userId = localStorage.getItem("userId");
    if (!userId) return setError("User not logged in");

    try {
      const response = await axios.post("http://localhost:5000/balance/add", {
        userId,
        balance,
      });

      setSuccess("Balance added successfully!");
      setBalance("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add balance");
    }
  };

  return (
    <div className="mt-4 mb-4">
      <h5>Add Balance</h5>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            placeholder="Enter balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Add Balance
        </Button>
      </Form>
    </div>
  );
};

export default AddBalanceForm;
