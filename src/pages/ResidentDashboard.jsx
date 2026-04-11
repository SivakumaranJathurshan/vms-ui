import { useNavigate } from "react-router-dom";

function ResidentDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Resident Dashboard</h2>

      <button onClick={() => navigate("/create-visitor")}>
        Create Visitor
      </button>

      <br /><br />

      <button onClick={() => navigate("/visitors")}>
        My Visitors / Approvals
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default ResidentDashboard;