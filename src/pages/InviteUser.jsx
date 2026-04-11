import { useState } from "react";

function InviteUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("Resident");
  const [message, setMessage] = useState("");
  const [activationLink, setActivationLink] = useState("");

  const inviteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7043/api/User/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          fullName,
          email,
          roleName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || data.title || "Invite failed");
        return;
      }

      setMessage("User invited successfully");
      setActivationLink(data.activationLink || "");
    } catch (error) {
      console.error(error);
      setMessage("Error inviting user");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Invite User</h2>

      <div>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <select
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        >
          <option value="Resident">Resident</option>
          <option value="Security">Security</option>
        </select>
      </div>

      <br />

      <button onClick={inviteUser}>
        Invite User
      </button>

      <p>{message}</p>

      {activationLink && (
        <div>
          <strong>Activation Link:</strong>
          <p>{activationLink}</p>
        </div>
      )}
    </div>
  );
}

export default InviteUser;