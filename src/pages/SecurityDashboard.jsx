import AppLayout from "../components/AppLayout";

function SecurityDashboard() {
  return (
    <AppLayout
      title="Security Dashboard"
      subtitle="Manage walk-in visitors, OTP verification, and gate operations"
      menuItems={[
        { label: "Create Walk-in Visitor", path: "/create-visitor" },
        { label: "Security Check-in", path: "/security" },
        { label: "View Visitors", path: "/visitors" },
      ]}
    >
      <div className="stats">
        <div className="stat-card">
          <h3>Approved Visitors</h3>
          <p>--</p>
        </div>

        <div className="stat-card">
          <h3>Checked-in Today</h3>
          <p>--</p>
        </div>
      </div>

      <div className="table-card">
        <h3>Security Operations</h3>
        <p>Handle visitor arrivals, OTP verification, check-in, and check-out.</p>
      </div>
    </AppLayout>
  );
}

export default SecurityDashboard;
