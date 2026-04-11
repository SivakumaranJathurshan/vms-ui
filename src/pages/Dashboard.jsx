import AdminDashboard from "./AdminDashboard";
import ResidentDashboard from "./ResidentDashboard";
import SecurityDashboard from "./SecurityDashboard";
import { getUserInfo, getUserRole } from "../services/auth";

function Dashboard() {
  const role = getUserRole();
  const user = getUserInfo();

  if (role === "Admin") {
    return <AdminDashboard />;
  }

  if (role === "Resident") {
    return <ResidentDashboard />;
  }

  if (role === "Security") {
    return <SecurityDashboard />;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>
      <p>Role not recognized.</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;