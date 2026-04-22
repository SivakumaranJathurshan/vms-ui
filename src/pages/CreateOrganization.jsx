import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateOrganization() {
  const [orgName, setOrgName] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const createOrganization = async () => {
    try {
      const response = await fetch("https://localhost:7043/api/organization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          organizationName: orgName,
          address,
          adminFullName: fullName,
          adminEmail: email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || data.title || "Error creating organization");
        return;
      }

      setMessage(data.message || "Organization created. Please verify your email.");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch {
      setMessage("Error creating organization");
    }
  };

  return (
    <div className="center-page">
      <div className="card">
        <div className="title">Create Organization</div>
        <div className="subtitle">Set up your VMS workspace</div>

        <div className="form-group">
          <input className="input" placeholder="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="input" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="input" placeholder="Admin Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="input" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-primary" onClick={createOrganization}>
          Create Organization
        </button>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default CreateOrganization;