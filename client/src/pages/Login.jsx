import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("uv_token", data.token);
      localStorage.setItem("uv_user", JSON.stringify(data.user)); // keep name/email/id
      navigate("/dashboard"); // ✅ redirect after login
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>🌌 UniVerse Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email" placeholder="Email" className="neon-input"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password" placeholder="Password" className="neon-input"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <button className="cosmic-btn">Login</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          New to UniVerse?{" "}
          <Link to="/register" style={{ color: "#9333ea", fontWeight: 600 }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
