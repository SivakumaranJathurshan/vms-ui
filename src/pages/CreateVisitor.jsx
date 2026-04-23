import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

function CreateVisitor() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [residentId, setResidentId] = useState("");
  const [residents, setResidents] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState([]);

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

      if (role === "Resident") {
        setResidentId(user.UserId);
        return;
      }

      const response = await fetch("https://localhost:7043/api/User/residents", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

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

  const searchVisitors = async (term) => {
    try {
      const token = localStorage.getItem("token");

      if (!term || term.trim().length < 2) {
        setMatches([]);
        return;
      }

      const response = await fetch(
        `https://localhost:7043/api/visitor/search?term=${encodeURIComponent(term)}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMatches([]);
        return;
      }

      setMatches(data);
    } catch {
      setMatches([]);
    }
  };

  const selectExistingVisitor = (visitor) => {
    setFullName(visitor.fullName);
    setMobile(visitor.mobile);
    setMatches([]);
    setMessage("Existing visitor details loaded. Complete the visit details.");
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
      setMatches([]);
      if (userRole !== "Resident") setResidentId("");
    } catch {
      setMessage("Error connecting to server");
    }
  };

  useEffect(() => {
    loadResidents();
  }, []);

  return (
    <AppLayout
      title="Create Visitor"
      subtitle="Register a new visit request"
      menuItems={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "View Visitors", path: "/visitors" },
        { label: "Invite User", path: "/invite" },
      ]}
    >
      <div className="card" style={{ maxWidth: "760px" }}>
        <div className="form-grid">
          <div className="form-group">
            <label className="label">Visitor Name</label>
            <input
              className="input"
              placeholder="Enter visitor name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                searchVisitors(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label className="label">Mobile Number</label>
            <input
              className="input"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                searchVisitors(e.target.value);
              }}
            />
          </div>
        </div>

        {matches.length > 0 && (
          <div className="info-box" style={{ marginBottom: "20px" }}>
            <strong>Suggested Existing Visitors</strong>
            {matches.map((visitor, index) => (
              <div
                key={index}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #dbeafe",
                  cursor: "pointer"
                }}
                onClick={() => selectExistingVisitor(visitor)}
              >
                {visitor.fullName} - {visitor.mobile}
              </div>
            ))}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label className="label">Purpose</label>
            <input
              className="input"
              placeholder="Enter purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="label">Visit Date & Time</label>
            <input
              className="input"
              type="datetime-local"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
          </div>

          {userRole !== "Resident" && (
            <div className="form-group full-width">
              <label className="label">Assign Resident</label>
              <select
                className="select"
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
            </div>
          )}
        </div>

        <button className="btn btn-primary" onClick={createVisitor}>
          Create New Visit Request
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </AppLayout>
  );
}

export default CreateVisitor;
