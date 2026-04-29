import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const requestReset = async () => {
    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Enter a valid email address");
      return;
    }

    try {
      const response = await fetch("https://localhost:7043/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });

      const data = await response.json();
      setMessage(data.message || "Password reset link sent");
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <div className="title">Forgot Password</div>
        <div className="subtitle">
          Enter your email address to receive a reset link.
        </div>

        <div className="form-group">
          <input
            className="input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={requestReset}>
          Send Reset Link
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
          style={{ marginLeft: "10px" }}
        >
          Back to Login
        </button>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
