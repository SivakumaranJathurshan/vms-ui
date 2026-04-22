import { useNavigate } from "react-router-dom";

function AppLayout({ title, subtitle, children, menuItems = [] }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h2>VMS</h2>
          <p>Visitor Management</p>
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
        </div>

        {children}
      </main>
    </div>
  );
}

export default AppLayout;
