import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles.css"; // CSS should have .form-container and .form-box!!


export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", { username, password });

      // store token + user info in context
      login(res.data.access_token, {
        username: res.data.username,
        role: res.data.role,
      });

      // clear form
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/auth/register", { username, password });
      alert("Registration successful! Please log in.");
      setShowRegister(false);

      // clear form
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="form-container"
      style={{ flexDirection: "column" }} // stack title and box
    >
    
      <h1
        className="animated-title"
        style={{
          color: "#45320F",
          textAlign: "center",
          marginBottom: "2rem",
          fontSize: "3rem",
          fontFamily: "Georgia",
        }}
      >
        Kata Sweet Shop
      </h1>
      <h2><i>✨Treat Yourself, One Sweet at a Time ✨</i></h2>

      {/* Login Box */}
      <div className="form-box">
        {showRegister ? (
          <>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
              <input
                className="fade-in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                className="fade-in"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "80%",
                  margin: "0.5rem auto",
                  display: "block",
                  backgroundColor: "#003366",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <p
              style={{ marginTop: "1rem", cursor: "pointer", color: "#1890ff" }}
              onClick={() => setShowRegister(false)}
            >
              Already have an account? Login
            </p>
          </>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <input
                className="fade-in"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "80%",
                  margin: "0.5rem auto",
                  display: "block",
                  backgroundColor: "#003366",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p
              style={{ marginTop: "1rem", cursor: "pointer", color: "#1890ff" }}
              onClick={() => setShowRegister(true)}
            >
              New user? Register here
            </p>
          </>
        )}
      </div>
    </div>
  );
}
