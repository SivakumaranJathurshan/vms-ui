import { useState } from "react";

function CreateOrganization() {
  const [orgName, setOrgName] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createOrganization = async () => {
    try {
      const response = await fetch(
        "https://localhost:7043/api/organization",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organizationName: orgName,
            address: address,
            adminFullName: fullName,
            adminEmail: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || data.title || "Error creating organization");
        return;
      }

      localStorage.setItem("token", data.token);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Error creating organization");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Organization</h2>

      <div>
        <input
          placeholder="Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          placeholder="Admin Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <br />

      <button onClick={createOrganization}>Create Organization</button>
    </div>
  );
}

export default CreateOrganization;