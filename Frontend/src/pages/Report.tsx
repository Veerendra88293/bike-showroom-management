import React from "react";
import { useGetReportStatsQuery } from "../slice/services/report";
import DashboardCards from "../components/Cards";
import DashboardLayout from "../layout/DashboardLayout";

import { Typography } from "antd";
import DashboardCharts from "../components/Charts";
import { useGetDashboardStatsQuery } from "../slice/services/dashboardApi";
import RecentSalesTable from "../components/RecentSalesTable";

const { Title } = Typography;
// import DashboardCharts from "../components/Charts";
const AdminReport = () => {
  const { data: reportData, isLoading: reportLoading } = useGetReportStatsQuery(
    undefined,
    {}
  );
  const { data } = useGetDashboardStatsQuery(undefined, {});
  console.log("Admin report Data:", reportData);

  return (
    <DashboardLayout>
      <Title level={3}>Dashboard</Title>
      <DashboardCards
        data={reportData}
        loading={reportLoading}
        role="Admin"
        report={true}
      />
      <DashboardCharts
        reportData={reportData}
        data={data}
        role="Admin"
        report={true}
      />
      <RecentSalesTable
        sales={reportData?.allSales || []}
        role="Admin"
        showAll={true}
      />
    </DashboardLayout>
  );
};

export default AdminReport;
