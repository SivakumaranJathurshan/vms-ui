import { useEffect, useState } from "react";
import { Clock3, CheckCircle2, LogIn } from "lucide-react";
import AppLayout from "../components/AppLayout";

function ResidentDashboard() {
  const [stats, setStats] = useState({
    myPendingApprovals: 0,
    myApprovedVisitors: 0,
    myCheckedInVisitors: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://localhost:7043/api/visitor/resident-dashboard-stats",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        const data = await response.json();

        setStats({
          myPendingApprovals: data.myPendingApprovals || 0,
          myApprovedVisitors: data.myApprovedVisitors || 0,
          myCheckedInVisitors: data.myCheckedInVisitors || 0,
        });
      } catch (error) {
        console.error("Failed to load resident dashboard stats", error);
      }
    };

    loadStats();
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

      <div className="dashboard-panel">
        <h3>Overview</h3>
        <p>
          Review incoming requests, track approvals, and monitor visitor entry
          under your assigned residence.
        </p>
      </div>
    </AppLayout>
  );
}

export default ResidentDashboard;

