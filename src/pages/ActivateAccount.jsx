import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, KeyRound } from "lucide-react";

function ActivateAccount() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const activateAccount = async () => {
    if (!token) {
      setStatus("error");
      setMessage("Activation token is missing.");
      return;
    }

    if (!password.trim()) {
      setStatus("error");
      setMessage("Password is required.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7043/api/User/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || data.title || "Account activation failed.");
        return;
      }

      setStatus("success");
      setMessage("Account activated successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch {
      setStatus("error");
      setMessage("Unable to connect to the server.");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <img src="/pwa-192.png" alt="VMS Logo" className="auth-logo" />

        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          {status === "success" && <CheckCircle2 size={56} color="#16a34a" />}
          {status === "error" && <XCircle size={56} color="#dc2626" />}
          {!status && <KeyRound size={56} color="#4f46e5" />}
        </div>

        <div className="title" style={{ textAlign: "center" }}>
          Activate Account
        </div>

        <div className="subtitle" style={{ textAlign: "center" }}>
          Set your password to complete your VMS account activation.
        </div>

        <div className="form-group">
          <input
            className="input"
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={activateAccount}
          style={{ width: "100%" }}
        >
          Activate Account
        </button>

        {message && (
          <p className="message" style={{ textAlign: "center" }}>
            {message}
          </p>
        )}

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
          style={{ width: "100%", marginTop: "12px" }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ActivateAccount;
