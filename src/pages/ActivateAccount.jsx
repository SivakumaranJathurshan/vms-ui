import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ActivateAccount() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const activate = async () => {
    try {
      const response = await fetch(
        "https://localhost:7043/api/User/activate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || data.title || "Activation failed");
        return;
      }

      setMessage("Account activated successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      setMessage("Error activating account");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Activate Account</h2>

      <input
        type="password"
        placeholder="Set Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={activate}>Activate Account</button>

      <p>{message}</p>
    </div>
  );
}

export default ActivateAccount;