import { useNavigate } from "react-router-dom";
import { getInitials, getUserName, getUserRole } from "../services/auth";

function AppLayout({ title, subtitle, children, menuItems = [] }) {
  const navigate = useNavigate();

  const userName = getUserName();
  const userRole = getUserRole();
  const initials = getInitials(userName);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand logo-brand">
          <img src="/pwa-192.png" className="app-logo" />
          <div>
          <h2>VMS</h2>
          <p>Visitor Management</p>
          </div>
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="sidebar-btn"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button className="sidebar-btn logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <div>
            <h1>{title}</h1>
            {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
          </div>

          <div className="topbar-profile">
            <div className="user-avatar small">{initials}</div>
            <div>
              <div className="user-name dark">{userName}</div>
              <div className="user-role">{userRole}</div>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

export default AppLayout;
