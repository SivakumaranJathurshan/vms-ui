import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Dashboard</h2>

      <button onClick={() => navigate("/invite")}>Invite User</button>

      <br /><br />

      <button onClick={() => navigate("/create-visitor")}>Create Visitor</button>

      <br /><br />

      <button onClick={() => navigate("/visitors")}>View Visitors</button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;