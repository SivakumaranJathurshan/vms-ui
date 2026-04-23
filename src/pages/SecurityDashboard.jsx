import { useEffect, useState } from "react";
import { CheckCheck, UserPlus, LogIn, LogOut } from "lucide-react";
import AppLayout from "../components/AppLayout";

function SecurityDashboard() {
  const [stats, setStats] = useState({
    approvedVisitorsForToday: 0,
    walkInVisitorsForToday: 0,
    currentlyCheckedIn: 0,
    checkedOutToday: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://localhost:7043/api/visitor/security-dashboard-stats",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        const data = await response.json();

        setStats({
          approvedVisitorsForToday: data.approvedVisitorsForToday || 0,
          walkInVisitorsForToday: data.walkInVisitorsForToday || 0,
          currentlyCheckedIn: data.currentlyCheckedIn || 0,
          checkedOutToday: data.checkedOutToday || 0,
        });
      } catch (error) {
        console.error("Failed to load security dashboard stats", error);
      }
    };

    loadStats();
  }, []);

  return (
    <AppLayout
      title="Security Dashboard"
      subtitle="Monitor today's entry flow and gate activity"
      menuItems={[
        { label: "Create Walk-in Visitor", path: "/create-visitor" },
        { label: "Security Check-in", path: "/security" },
        { label: "View Visitors", path: "/visitors" },
      ]}
    >
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-icon"><CheckCheck size={24} /></div>
          <div className="metric-content">
            <h4>Approved Visitors for Today</h4>
            <p>{stats.approvedVisitorsForToday}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><UserPlus size={24} /></div>
          <div className="metric-content">
            <h4>Walk-in Visitors for Today</h4>
            <p>{stats.walkInVisitorsForToday}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><LogIn size={24} /></div>
          <div className="metric-content">
            <h4>Currently Checked-in</h4>
            <p>{stats.currentlyCheckedIn}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><LogOut size={24} /></div>
          <div className="metric-content">
            <h4>Checked-out Today</h4>
            <p>{stats.checkedOutToday}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Overview</h3>
        <p>
          Track approved arrivals, walk-ins, and all current gate movement for today.
        </p>
      </div>
    </AppLayout>
  );
}

export default SecurityDashboard;
