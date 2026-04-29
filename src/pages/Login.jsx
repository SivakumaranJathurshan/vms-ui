import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    if (!email.trim()) {
    setMessage("Email is required");
    return;
    }

    if (!password.trim()) {
    setMessage("Password is required");
    return;
    }
    
    try {
      const response = await fetch("https://localhost:7043/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || data.title || "Login failed");
        return;
      }

      const token = data.token || data.Token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <img src="/pwa-192.png" alt="VMS Logo" className="auth-logo" />
        <div className="title">Visitor Management System</div>
        <div className="subtitle">Sign in to continue</div>

        <div className="form-group">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={login}>
          Login
        </button>

        <div style={{ marginTop: "16px" }}>
          <button
          className="btn btn-secondary"
          onClick={() => navigate("/create-organization")}
          >
          Create Organization
          </button>

          <button
          className="btn btn-secondary"
          onClick={() => navigate("/forgot-password")}
          style={{ marginLeft: "10px" }}
          >
          Forgot Password
          </button>
        </div>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}



export default Login;

