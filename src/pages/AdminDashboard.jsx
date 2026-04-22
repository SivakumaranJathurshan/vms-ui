import AppLayout from "../components/AppLayout";

function AdminDashboard() {
  return (
    <AppLayout
      title="Admin Dashboard"
      menuItems={[
        { label: "Invite User", path: "/invite" },
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "View Visitors", path: "/visitors" }
      ]}
    >
      <div className="stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>--</p>
        </div>

        <div className="stat-card">
          <h3>Total Visitors</h3>
          <p>--</p>
        </div>

        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>--</p>
        </div>
      </div>

      <div className="table-card">
        <h3>Welcome Admin</h3>
        <p>
          Manage your organization users, visitor approvals, invitations and
          security workflow from one place.
        </p>
      </div>
    </AppLayout>
  );
}

export default AdminDashboard;