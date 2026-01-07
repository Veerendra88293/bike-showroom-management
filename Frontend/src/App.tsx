import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Spin } from "antd";
import AdminReport from "./pages/Report";
import ProtectedRoute from "./components/ProtectedRoute";
import { getToken } from "./utils/getToken";


const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const Sales = lazy(() => import("./pages/Sales"));
const Employees = lazy(() => import("./pages/Employees"));
const Bikes = lazy(() => import("./pages/Bikes"));

const App = () => {
  const [token, setToken] = useState<string | null>(
    ()=>getToken()
  );

  

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
       <Routes>
          {/* Public route */}
          <Route path="/login"  element={<Login setToken={setToken} />} />

          {/* Protected routes (any logged-in user) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/bikes" element={<Bikes />} />
            
          </Route>

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
            <Route path="/employees" element={<Employees />} />
            <Route path="/reports" element={<AdminReport />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
