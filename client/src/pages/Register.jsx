import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully!");
      navigate("/"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Header />

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #0052d4, #4364f7, #6fb1fc);
          background-size: 400% 400%;
          animation: bgFlow 10s ease infinite;
        }

        @keyframes bgFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .register-container {
          min-height: 90vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .register-card {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
          text-align: center;
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .register-title {
          font-size: 28px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }

        .register-input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 30px;
          border: none;
          background: #f0f0f0;
          font-size: 14px;
          padding-left: 20px;
        }

        .register-btn {
          width: 100%;
          padding: 12px;
          margin-top: 20px;
          background: linear-gradient(to right, #ff9966, #ff5e62);
          border: none;
          border-radius: 30px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .register-btn:hover {
          transform: scale(1.05);
        }

        .login-link {
          margin-top: 12px;
          font-size: 14px;
          color: #444;
        }

        .login-link a {
          color: #0052d4;
          text-decoration: none;
          font-weight: bold;
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 30px 20px;
          }

          .register-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="register-input"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              className="register-input"
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              required
            />
            <input
              className="register-input"
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              required
            />
            <button className="register-btn" type="submit">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
