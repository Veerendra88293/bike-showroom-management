import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/jwt";
import { getToken } from "../utils/getToken";

const Dashboard = () => {
  const token = getToken();
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
