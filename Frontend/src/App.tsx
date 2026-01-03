import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { Spin } from "antd";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Customers = lazy(() => import("./pages/Customers"));
const Sales = lazy(() => import("./pages/Sales"));
const Employees = lazy(() => import("./pages/Employees"));
const Bikes = lazy(() => import("./pages/Bikes"));

const App = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

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
          <Route
            path="/login"
            element={<Login setToken={setToken} setRole={setRole} />}
          />

          {token ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/bikes" element={<Bikes />} />

              {role === "Admin" && (
                <Route path="/employees" element={<Employees />} />
              )}

              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
