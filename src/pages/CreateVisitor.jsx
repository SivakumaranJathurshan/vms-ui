import { useEffect, useState } from "react";

function CreateVisitor() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [residentId, setResidentId] = useState("");
  const [residents, setResidents] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const loadResidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = parseJwt(token);

      const role =
        user.role ||
        user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      setUserRole(role);

      // if resident → auto select themselves
      if (role === "Resident") {
        setResidentId(user.UserId);
        return;
      }

      // admin/security → load dropdown
      const response = await fetch(
        "https://localhost:7043/api/User/residents",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage("Failed to load residents");
        return;
      }

      setResidents(data);
    } catch {
      setMessage("Error loading residents");
    }
  };

  const createVisitor = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7043/api/visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          fullName,
          mobile,
          purpose,
          visitDate,
          residentId: parseInt(residentId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create visitor");
        return;
      }

      setMessage("Visitor created successfully");

      setFullName("");
      setMobile("");
      setPurpose("");
      setVisitDate("");
    } catch {
      setMessage("Error connecting to server");
    }
  };

  useEffect(() => {
    loadResidents();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create Visitor</h2>

      <input
        placeholder="Visitor Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />

      <br /><br />

      <input
        type="datetime-local"
        value={visitDate}
        onChange={(e) => setVisitDate(e.target.value)}
      />

      <br /><br />

      {/* Show dropdown only for Admin/Security */}
      {userRole !== "Resident" && (
        <>
          <select
            value={residentId}
            onChange={(e) => setResidentId(e.target.value)}
          >
            <option value="">Select Resident</option>
            {residents.map((resident) => (
              <option key={resident.userId} value={resident.userId}>
                {resident.fullName} ({resident.email})
              </option>
            ))}
          </select>

          <br /><br />
        </>
      )}

      <button onClick={createVisitor}>
        Create Visitor
      </button>

      <p>{message}</p>
    </div>
  );
}

export default CreateVisitor;