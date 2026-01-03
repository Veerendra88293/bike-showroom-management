import DashboardCards from "../components/Cards";
import DashboardCharts from "../components/Charts";
import RecentSalesTable from "../components/RecentSalesTable";
import DashboardLayout from "../layout/DashboardLayout";
import { Typography } from "antd";
import { useGetDashboardStatsQuery } from "../slice/services/dashboardApi";
const { Title } = Typography;

const AdminDashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery(undefined, {});
  console.log("Admin Dashboard Data:", data);

  return (
    <DashboardLayout>
      <Title level={3}>Dashboard</Title>
      <DashboardCards data={data} loading={isLoading} role="Admin" />
      <DashboardCharts data={data} role="Admin" />
      <RecentSalesTable sales={data?.recentSales || []} role="Admin" />
    </DashboardLayout>
  );
};

export default AdminDashboard;
