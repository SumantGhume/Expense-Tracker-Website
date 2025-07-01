// src/pages/Reports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Form, Table } from "react-bootstrap";
import { useApi } from "../Context/ApiContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA66CC", "#FF6666"];

const Reports = () => {
    const { BASE_URL } = useApi();
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/expenses/show/${userId}`);
        setTransactions(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error.message);
      }
    };
    fetchTransactions();
  }, [userId]);

  useEffect(() => {
    let data = [...transactions];
    if (categoryFilter) {
      data = data.filter((tx) => tx.category === categoryFilter);
    }
    if (dateFilter) {
      data = data.filter((tx) => tx.date === dateFilter);
    }
    setFiltered(data);
  }, [categoryFilter, dateFilter, transactions]);

  // Pie Chart Data
  const spendingData = Object.entries(
    filtered
      .filter((tx) => tx.type === "Expense")
      .reduce((acc, cur) => {
        acc[cur.category] = (acc[cur.category] || 0) + parseFloat(cur.amount);
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  // Bar Chart Data
  const barData = [
    {
      name: "March",
      Income: filtered.filter((tx) => tx.type === "Income").reduce((acc, cur) => acc + parseFloat(cur.amount), 0),
      Expense: filtered.filter((tx) => tx.type === "Expense").reduce((acc, cur) => acc + parseFloat(cur.amount), 0),
    }
  ];

  const uniqueCategories = [...new Set(transactions.map(tx => tx.category))];
  const uniqueDates = [...new Set(transactions.map(tx => tx.date))];

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Reports</h3>

      <div className="row mb-5">
        <div className="col-md-6">
          <h6>Spending Breakdown</h6>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {spendingData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-md-6">
          <h6>Income vs. Expenses</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#28a745" />
              <Bar dataKey="Expense" fill="#dc3545" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h5 className="mb-3">Transaction History</h5>
      <div className="d-flex gap-3 mb-3">
        <Form.Select
          style={{ maxWidth: "200px" }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Filter by category</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </Form.Select>

        <Form.Select
          style={{ maxWidth: "200px" }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="">Filter by date</option>
          {uniqueDates.map((dt, i) => (
            <option key={i} value={dt}>{new Date(dt).toLocaleDateString()}</option>
          ))}
        </Form.Select>
      </div>

      <Table bordered responsive striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((tx) => (
            <tr key={tx._id}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.description}</td>
              <td>{tx.category}</td>
              <td className={tx.type === "Income" ? "text-success" : "text-danger"}>
                ${parseFloat(tx.amount).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reports;
