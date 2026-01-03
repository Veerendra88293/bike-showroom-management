import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";

const Dashboard = () => {
  const role = localStorage.getItem("role");

  if (role === "Admin") {
    return <AdminDashboard />;
  }

  return <StaffDashboard />;
};

export default Dashboard;
