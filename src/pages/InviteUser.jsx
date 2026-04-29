import { useState } from "react";
import AppLayout from "../components/AppLayout";

function InviteUser() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleName, setRoleName] = useState("Resident");
  const [message, setMessage] = useState("");
  

  const inviteUser = async () => {
    if (!fullName.trim()) {
    setMessage("Full name is required");
    return;
    }

    if (!email.trim()) {
    setMessage("Email is required");
    return;
    }

    if (!email.includes("@")) {
    setMessage("Enter a valid email address");
    return;
    }

    if (!roleName) {
    setMessage("Role is required");
    return;
    }

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

      setMessage(data.message || "User invited successfully");
      setFullName("");
      setEmail("");
      setRoleName("Resident");
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <AppLayout
      title="Invite User"
      subtitle="Invite residents or security staff to your organization"
      menuItems={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "View Visitors", path: "/visitors" },
      ]}
    >
      <div className="card" style={{ maxWidth: "700px" }}>
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Full Name</label>
            <input
              className="input"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Email</label>
            <input
              className="input"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Role</label>
            <select
              className="select"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            >
              <option value="Resident">Resident</option>
              <option value="Security">Security</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" onClick={inviteUser}>
          Send Invitation
        </button>

        {message && <p className="message">{message}</p>}

        
      </div>
    </AppLayout>
  );
}

export default InviteUser;
