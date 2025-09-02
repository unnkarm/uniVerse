import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      // If backend doesn’t return JSON properly, catch it here
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("❌ Server did not return JSON. Check backend.");
      }

      if (!res.ok) throw new Error(data.msg || "Registration failed");

      alert("✅ Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h1>🚀 Join UniVerse</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="neon-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="neon-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="neon-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button className="cosmic-btn" disabled={loading}>
            {loading ? "⏳ Registering..." : "Register"}
          </button>
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
