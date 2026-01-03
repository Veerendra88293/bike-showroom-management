import DashboardCards from "../components/Cards";
import DashboardCharts from "../components/Charts";
import RecentSalesTable from "../components/RecentSalesTable";
import DashboardLayout from "../layout/DashboardLayout";
import { Typography } from "antd";
import { useGetDashboardStatsQuery } from "../slice/services/dashboardApi";

const { Title } = Typography;

const StaffDashboard = () => {
  // fetch dashboard is already isolated per staff in backend
  const { data, isLoading } = useGetDashboardStatsQuery();
  console.log(data, "staff");
  return (
    <DashboardLayout>
      <Title level={3}>Dashboard</Title>

      <DashboardCards data={data} loading={isLoading} role="Staff" />
      <DashboardCharts data={data} role="Staff" />
      <RecentSalesTable sales={data?.recentSales || []} role="Staff" />
    </DashboardLayout>
  );
};

export default StaffDashboard;
