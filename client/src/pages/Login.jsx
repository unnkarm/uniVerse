import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ prevent page refresh
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "❌ Login failed");
      }

      // ✅ Save JWT
      localStorage.setItem("token", data.token);

      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h2>🔑 Login</h2>
        <form onSubmit={handleLogin}>
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
          />
          <button className="cosmic-btn" disabled={loading}>
            {loading ? "⏳ Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Not registered?{" "}
          <Link to="/register" style={{ color: "#9333ea", fontWeight: 600 }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
