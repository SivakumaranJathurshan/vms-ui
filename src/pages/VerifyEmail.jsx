import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [message, setMessage] = useState("Verifying email...");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setMessage("Verification token is missing");
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
            body: JSON.stringify({
              token: token,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || data.title || "Email verification failed");
          return;
        }

        setMessage("Email verified successfully. Redirecting to login...");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch {
        setMessage("Error verifying email");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Verify Email</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;
