import AppLayout from "../components/AppLayout";

function ResidentDashboard() {
  return (
    <AppLayout
      title="Resident Dashboard"
      subtitle="Manage your visitor requests and approvals"
      menuItems={[
        { label: "Create Visitor", path: "/create-visitor" },
        { label: "My Visitors", path: "/visitors" },
      ]}
    >
      <div className="stats">
        <div className="stat-card">
          <h3>Pending Visitors</h3>
          <p>--</p>
        </div>

        <div className="stat-card">
          <h3>Approved Visitors</h3>
          <p>--</p>
        </div>
      </div>

      <div className="table-card">
        <h3>Resident Actions</h3>
        <p>Create visitor requests and approve assigned visitors from one place.</p>
      </div>
    </AppLayout>
  );
}

export default ResidentDashboard;
