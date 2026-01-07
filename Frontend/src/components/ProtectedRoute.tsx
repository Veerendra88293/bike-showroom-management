import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/jwt";
import { getToken } from "../utils/getToken";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = jwtDecode<JwtPayload>(token);
  const role = decoded.role;


  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
