import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

function VerifyEmail() {
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const response = await fetch(
          "https://localhost:7043/api/Organization/verify-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setMessage(data.message || data.title || "Email verification failed.");
          return;
        }

        setStatus("success");
        setMessage("Email verified successfully. Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch {
        setStatus("error");
        setMessage("Unable to connect to the server.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="center-page">
      <div className="card">
        <img src="/pwa-192.png" alt="VMS Logo" className="auth-logo" />

        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          {status === "loading" && <Loader2 size={52} />}
          {status === "success" && <CheckCircle2 size={56} color="#16a34a" />}
          {status === "error" && <XCircle size={56} color="#dc2626" />}
        </div>

        <div className="title" style={{ textAlign: "center" }}>
          Verify Email
        </div>

        <div className="subtitle" style={{ textAlign: "center" }}>
          Confirming your VMS account access.
        </div>

        <p className="message" style={{ textAlign: "center" }}>
          {message}
        </p>

        {status === "error" && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
            style={{ width: "100%", marginTop: "16px" }}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
