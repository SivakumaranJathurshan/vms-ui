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

function Visitors() {
  const [visitors, setVisitors] = useState([]);

  const loadVisitors = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("https://localhost:7043/api/visitor", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    setVisitors(data);
  };

  const approveVisitor = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`https://localhost:7043/api/visitor/approve/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    loadVisitors();
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  return (
    <AppLayout
      title="Visitors"
      subtitle="View and manage visitor requests"
      menuItems={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "Security Check-in", path: "/security" },
      ]}
    >
      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((v) => (
              <tr key={v.visitorId}>
                <td>{v.fullName}</td>
                <td>{v.mobile}</td>
                <td>{v.purpose}</td>
                <td>
                  <span className={getBadgeClass(v.status)}>{v.status}</span>
                </td>
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
