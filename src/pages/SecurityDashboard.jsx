import { useNavigate } from "react-router-dom";

function SecurityDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Security Dashboard</h2>

      <button onClick={() => navigate("/create-visitor")}>
        Create Walk-in Visitor
      </button>

      <br /><br />

      <button onClick={() => navigate("/security")}>
        Security Check-in / Check-out
      </button>

      <br /><br />

      <button onClick={() => navigate("/visitors")}>
        View Visitors
      </button>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default SecurityDashboard;