import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles.css";

export default function LoginPopup({ onLogin }) {
  const { setToken } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await axios.post("/auth/register", { username, password });
        alert("Registration successful! Please log in.");
        setIsRegister(false);
      } else {
        const res = await axios.post("/auth/login", { username, password });
        const token = res.data.access_token;
        setToken(token);
        localStorage.setItem("token", token);
        onLogin();
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p
          className="switch-form"
          onClick={() => setIsRegister(!isRegister)}
          style={{ cursor: "pointer", marginTop: "1rem", color: "#1890ff" }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New user? Register here"}
        </p>
      </div>
    </div>
  );
}
