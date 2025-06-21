import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Api";

// ✅ Import Header and Footer
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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

        .login-container {
          min-height: 80vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-card {
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 16px;
          width: 90%;
          max-width: 380px;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.2);
          text-align: center;
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .login-title {
          font-size: 28px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }

        .login-input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border-radius: 30px;
          border: none;
          background: #f0f0f0;
          font-size: 14px;
          padding-left: 20px;
        }

        .login-btn {
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

        .login-btn:hover {
          transform: scale(1.05);
        }

        .remember-section {
          display: flex;
          align-items: center;
          margin-top: 10px;
          font-size: 14px;
          justify-content: flex-start;
          gap: 10px;
        }

        .forgot {
          margin-top: 12px;
          font-size: 14px;
          color: #555;
        }

        .signup {
          margin-top: 12px;
          font-size: 14px;
          color: #444;
        }

        .signup a {
          color: #0052d4;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="login-input"
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              required
            />
            <input
              className="login-input"
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              required
            />
            <div className="remember-section">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <button className="login-btn" type="submit">LOG IN</button>
          </form>
          <p className="signup">
            Not a member? <Link to="/register">Sign up now</Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
