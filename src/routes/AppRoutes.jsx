import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

// Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import { Toaster } from "react-hot-toast";
import Unauthorized from "../pages/public/Unauthorized";
import VendorLayout from "../layouts/VendorLayout";
import VendorDashboard from "../pages/vendor/VendorDashboard";

const AppRoutes = () => {
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#062E2E",
            color: "#EAF6F6",
            border: "2px solid white",
          },
        }}
      />
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* AUTH REQUIRED */}
        <Route element={<ProtectedRoute />}>
          {/* Emp */}
          <Route element={<RoleRoute allowedRoles={["vendor"]} />}>
            <Route element={<VendorLayout />}>
              <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            </Route>
          </Route>

          {/* ADMIN */}
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
