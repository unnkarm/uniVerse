import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";

function App() {
  // ✅ Match the key with login.js → we stored token as "token"
  const authed = !!localStorage.getItem("token");

  return (
    <Router>
      <nav style={{
        position: "fixed",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(15px)",
        borderRadius: 12,
        padding: "10px 20px",
        zIndex: 50
      }}>
        <Link to="/" style={{ margin: "0 10px", color: "white" }}>Home</Link>
        {!authed && <Link to="/login" style={{ margin: "0 10px", color: "white" }}>Login</Link>}
        {!authed && <Link to="/register" style={{ margin: "0 10px", color: "white" }}>Register</Link>}
        {authed && <Link to="/dashboard" style={{ margin: "0 10px", color: "white" }}>Dashboard</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={authed ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={authed ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={authed ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

