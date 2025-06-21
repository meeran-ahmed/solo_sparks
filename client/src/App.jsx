import React from "react";
import { Routes, Route } from "react-router-dom";
import Reflections from "./pages/Reflections"; // 👈 Make sure path is correct
import Login from "./pages/Login.jsx"; // ✅ correct (capital "L")
  // ✅ lowercase
import Register from "./pages/Register.jsx"; // ✅ lowercase
import Dashboard from "./pages/Dashboard.jsx"; // ✅ lowercase





function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reflections" element={<Reflections />} />
      <Route path="/" element={<Login />} /> {/* optional default */}
    </Routes>
  );
}

export default App;
