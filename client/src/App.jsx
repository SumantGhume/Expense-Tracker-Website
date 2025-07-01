import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import EditExpense from "./pages/EditExpense";

import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Reports from "./pages/Reports";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditExpense /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports/></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
