import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/auth/register", { username, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="form-container"
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <div className="form-box" style={{ width: "280px", textAlign: "center" }}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
          <button
            type="submit"
            disabled={loading}
            className="form-btn"
            style={{ width: "40%", padding: "0.4rem", fontSize: "0.9rem" }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
