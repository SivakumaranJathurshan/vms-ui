import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const resetPassword = async () => {
    if (!token) {
      setMessage("Reset token is missing");
      return;
    }

    if (!newPassword.trim()) {
      setMessage("New password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://localhost:7043/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || data.title || "Password reset failed");
        return;
      }

      setMessage("Password reset successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <div className="title">Reset Password</div>
        <div className="subtitle">Set a new password for your account.</div>

        <div className="form-group">
          <input
            className="input"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

        <button className="btn btn-primary" onClick={resetPassword}>
          Reset Password
        </button>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
