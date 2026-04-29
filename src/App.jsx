import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateOrganization from "./pages/CreateOrganization";
import InviteUser from "./pages/InviteUser";
import ActivateAccount from "./pages/ActivateAccount";
import CreateVisitor from "./pages/CreateVisitor";
import Visitors from "./pages/Visitors";
import Security from "./pages/Security";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-organization" element={<CreateOrganization />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Shared Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Resident", "Security"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-visitor"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Resident", "Security"]}>
              <CreateVisitor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visitors"
          element={
            <ProtectedRoute allowedRoles={["Admin", "Resident", "Security"]}>
              <Visitors />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/invite"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <InviteUser />
            </ProtectedRoute>
          }
        />

        {/* Security Only */}
        <Route
          path="/security"
          element={
            <ProtectedRoute allowedRoles={["Security"]}>
              <Security />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
