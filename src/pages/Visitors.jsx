import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

function getBadgeClass(status) {
  if (status === "Pending Approval") return "badge badge-pending";
  if (status === "Approved") return "badge badge-approved";
  if (status === "Rejected") return "badge badge-rejected";
  if (status === "OTP Sent") return "badge badge-checked";
  if (status === "Checked In") return "badge badge-approved";
  if (status === "Checked Out") return "badge badge-checked";
  return "badge";
}

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [message, setMessage] = useState("");

  const loadVisitors = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7043/api/visitor", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage("Failed to load visitors");
        return;
      }

      setVisitors(data);
    } catch {
      setMessage("Unable to load visitors");
    }
  };

  const approveVisitor = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`https://localhost:7043/api/visitor/approve/${id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setMessage("Visitor approved");
      loadVisitors();
    } catch {
      setMessage("Approval failed");
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  return (
    <AppLayout
      title="Visitors"
      subtitle="Track requests, approvals, check-ins and exits"
      menuItems={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "Security", path: "/security" },
      ]}
    >
      <div className="table-card">
        {message && <p className="message">{message}</p>}

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Visit Date</th>
              <th>Approved</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((v) => (
              <tr key={v.visitorId}>
                <td>{v.fullName}</td>
                <td>{v.mobile}</td>

                <td>
                  <span className={getBadgeClass(v.status)}>
                    {v.status}
                  </span>
                </td>

                <td>{formatDateTime(v.visitDate)}</td>
                <td>{formatDateTime(v.approvedAt)}</td>
                <td>{formatDateTime(v.checkedInAt)}</td>
                <td>{formatDateTime(v.checkedOutAt)}</td>

                <td>
                  {v.status === "Pending Approval" && (
                    <button
                      className="btn btn-success"
                      onClick={() => approveVisitor(v.visitorId)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}

export default Visitors;
