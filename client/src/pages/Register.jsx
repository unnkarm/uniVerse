import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      alert("✅ Registered! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>🚀 Join UniVerse</h1>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" className="neon-input"
                 value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" className="neon-input"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="neon-input"
                 value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="cosmic-btn">Register</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#9333ea", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
