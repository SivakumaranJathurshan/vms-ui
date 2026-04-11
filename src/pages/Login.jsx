import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const response = await fetch("https://localhost:7043/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(errorText || "Login failed");
        return;
      }

      const data = await response.json();

      const token = data.token || data.Token;

      localStorage.setItem("token", token);

      setMessage("Login successful");

      window.location.href = "/dashboard";
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
      </div>

      <button onClick={login}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;