import { useEffect, useState } from "react";
import {
  Shield,
  Users,
  Mail,
  UserSquare2,
  LogIn,
  UserPlus
} from "lucide-react";
import AppLayout from "../components/AppLayout";

function AdminDashboard() {
  const [stats, setStats] = useState({
    securityUsers: 0,
    residentUsers: 0,
    pendingInvites: 0,
    totalVisitors: 0,
    checkedInVisitors: 0,
    walkInVisitors: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const [userRes, visitorRes] = await Promise.all([
          fetch("https://localhost:7043/api/User/dashboard-stats", {
            headers: { Authorization: "Bearer " + token },
          }),
          fetch("https://localhost:7043/api/visitor/admin-dashboard-stats", {
            headers: { Authorization: "Bearer " + token },
          }),
        ]);

        const userData = await userRes.json();
        const visitorData = await visitorRes.json();

        setStats({
          securityUsers: userData.securityUsers || 0,
          residentUsers: userData.residentUsers || 0,
          pendingInvites: userData.pendingInvites || 0,
          totalVisitors: visitorData.totalVisitors || 0,
          checkedInVisitors: visitorData.checkedInVisitors || 0,
          walkInVisitors: visitorData.walkInVisitors || 0,
        });
      } catch (error) {
        console.error("Failed to load admin dashboard stats", error);
      }
    };

    loadStats();
  }, []);

  return (
    <AppLayout
      title="Admin Dashboard"
      subtitle="Monitor users, invitations and visitor activity across the organization"
      menuItems={[
        { label: "Invite User", path: "/invite" },
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "View Visitors", path: "/visitors" },
      ]}
    >
      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-icon"><Shield size={24} /></div>
          <div className="metric-content">
            <h4>No. of Security Users</h4>
            <p>{stats.securityUsers}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><Users size={24} /></div>
          <div className="metric-content">
            <h4>No. of Resident Users</h4>
            <p>{stats.residentUsers}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><Mail size={24} /></div>
          <div className="metric-content">
            <h4>Pending Invites</h4>
            <p>{stats.pendingInvites}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><UserSquare2 size={24} /></div>
          <div className="metric-content">
            <h4>Total Visitors</h4>
            <p>{stats.totalVisitors}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><LogIn size={24} /></div>
          <div className="metric-content">
            <h4>Checked-in Visitors</h4>
            <p>{stats.checkedInVisitors}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon"><UserPlus size={24} /></div>
          <div className="metric-content">
            <h4>Walk-in Visitors</h4>
            <p>{stats.walkInVisitors}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-panel">
        <h3>Overview</h3>
        <p>
          This dashboard provides a live summary of user distribution, invitation
          activity, and visitor movement within the organization.
        </p>
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;

