import { useEffect, useState } from "react";
import { Clock3, CheckCircle2, LogIn } from "lucide-react";
import AppLayout from "../components/AppLayout";

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

function ResidentDashboard() {
  const [stats, setStats] = useState({
    myPendingApprovals: 0,
    myApprovedVisitors: 0,
    myCheckedInVisitors: 0,
  });

  const [todaysVisitors, setTodaysVisitors] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      try {
        const [statsRes, todayRes] = await Promise.all([
          fetch("https://localhost:7043/api/visitor/resident-dashboard-stats", {
            headers: { Authorization: "Bearer " + token },
          }),
          fetch("https://localhost:7043/api/visitor/today", {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);

        const statsData = await statsRes.json();
        const todayData = await todayRes.json();

        setStats({
          myPendingApprovals: statsData.myPendingApprovals || 0,
          myApprovedVisitors: statsData.myApprovedVisitors || 0,
          myCheckedInVisitors: statsData.myCheckedInVisitors || 0,
        });

        setTodaysVisitors(todayData || []);
      } catch (error) {
        console.error("Failed to load resident dashboard", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <AppLayout
      title="Resident Dashboard"
      subtitle="Review approvals and monitor your visitor requests"
      menuItems={[
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "My Visitors", path: "/visitors" },
      ]}
    >
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-icon"><Clock3 size={24} /></div>
          <div className="metric-content">
            <h4>My Pending Approvals</h4>
            <p>{stats.myPendingApprovals}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><CheckCircle2 size={24} /></div>
          <div className="metric-content">
            <h4>My Approved Visitors</h4>
            <p>{stats.myApprovedVisitors}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><LogIn size={24} /></div>
          <div className="metric-content">
            <h4>My Checked-in Visitors</h4>
            <p>{stats.myCheckedInVisitors}</p>
          </div>
        </div>
      </div>

      <div className="table-card">
        <h3 className="dashboard-table-title">Today’s Visitors</h3>

        {todaysVisitors.length === 0 ? (
          <p className="empty-state">No visitors assigned to you today.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Visit Time</th>
                <th>Approved At</th>
              </tr>
            </thead>
            <tbody>
              {todaysVisitors.map((v) => (
                <tr key={v.visitorId}>
                  <td>{v.fullName}</td>
                  <td>{v.mobile}</td>
                  <td>{v.purpose}</td>
                  <td>{v.status}</td>
                  <td>{formatDateTime(v.visitDate)}</td>
                  <td>{formatDateTime(v.approvedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
}

export default ResidentDashboard;
