import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/jwt";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  if (!decoded) {
    return null; // or <Login /> or redirect
  }

  if (decoded.role === "Admin") {
    return <AdminDashboard />;
  }

  return <StaffDashboard />;
};

export default Dashboard;
