import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateOrganization from "./pages/CreateOrganization";
import InviteUser from "./pages/InviteUser";
import ActivateAccount from "./pages/ActivateAccount";
import CreateVisitor from "./pages/CreateVisitor";
import Visitors from "./pages/Visitors";
import Security from "./pages/Security";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateOrganization />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invite" element={<InviteUser />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/create-visitor" element={<CreateVisitor />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;