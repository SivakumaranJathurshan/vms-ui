import { useEffect, useState } from "react";
import { CheckCheck, UserPlus, LogIn, LogOut } from "lucide-react";
import AppLayout from "../components/AppLayout";

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

function SecurityDashboard() {
  const [stats, setStats] = useState({
    approvedVisitorsForToday: 0,
    walkInVisitorsForToday: 0,
    currentlyCheckedIn: 0,
    checkedOutToday: 0,
  });

  const [todaysVisitors, setTodaysVisitors] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      try {
        const [statsRes, todayRes] = await Promise.all([
          fetch("https://localhost:7043/api/visitor/security-dashboard-stats", {
            headers: { Authorization: "Bearer " + token },
          }),
          fetch("https://localhost:7043/api/visitor/today", {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);

        const statsData = await statsRes.json();
        const todayData = await todayRes.json();

        setStats({
          approvedVisitorsForToday: statsData.approvedVisitorsForToday || 0,
          walkInVisitorsForToday: statsData.walkInVisitorsForToday || 0,
          currentlyCheckedIn: statsData.currentlyCheckedIn || 0,
          checkedOutToday: statsData.checkedOutToday || 0,
        });

        setTodaysVisitors(todayData || []);
      } catch (error) {
        console.error("Failed to load security dashboard", error);
      }
    };

    loadDashboard();
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

      <div className="table-card">
        <h3 className="dashboard-table-title">Today’s Visitors</h3>

        {todaysVisitors.length === 0 ? (
          <p className="empty-state">No visitors scheduled for today.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Visit Time</th>
                <th>Check In</th>
                <th>Check Out</th>
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
                  <td>{formatDateTime(v.checkedInAt)}</td>
                  <td>{formatDateTime(v.checkedOutAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
}

export default SecurityDashboard;
