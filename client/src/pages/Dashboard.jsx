// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Badge, Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddBalanceForm from "../components/AddBalanceForm";
import { useApi } from "../Context/ApiContext";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const navigate = useNavigate();
  const { BASE_URL } = useApi();

  const userId = localStorage.getItem("userId");


  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/expenses/show/${userId}`);
      const tx = res.data;
      console.log("Data: ",tx)
      setTransactions(tx);

      const incomeSum = tx
        .filter((t) => t.type === "Income")
        .reduce((acc, cur) => acc + Number(cur.amount), 0);
      const expenseSum = tx
        .filter((t) => t.type === "Expense")
        .reduce((acc, cur) => acc + Number(cur.amount), 0);

      setIncome(incomeSum);
      setExpense(expenseSum);
    } catch (error) {
      console.error("Failed to fetch transactions:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/delete/${id}`);
      fetchTransactions();
    } catch (err) {
      alert("Error deleting transaction");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Dashboard</h3>

      

      <div className="d-flex gap-3 flex-wrap mb-4">
        <Card className="p-3 flex-fill text-center shadow-sm">
          <h6>Total Balance</h6>
          <h4>${income - expense}</h4>
        </Card>
        <Card className="p-3 flex-fill text-center shadow-sm">
          <h6>Income</h6>
          <h4 className="text-success">${income}</h4>
        </Card>
        <Card className="p-3 flex-fill text-center shadow-sm">
          <h6>Expenses</h6>
          <h4 className="text-danger">${expense}</h4>
        </Card>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Recent Transactions</h5>
        <Button onClick={() => navigate("/add")} variant="primary">Add New Transaction</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan="5" className="text-center">No transactions found</td></tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx._id}>
                <td className={tx.type === "Income" ? "text-success" : "text-danger"}>
                  ${parseFloat(tx.amount).toLocaleString()}
                </td>
                <td>{tx.description}</td>
                <td>
                  <Badge bg={tx.type === "Income" ? "success" : tx.category === "Housing" ? "dark" : "primary"}>
                    {tx.category}
                  </Badge>
                </td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/edit/${tx._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(tx._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;
