import React from "react";
import { Card, Col, Row } from "antd";
import { Line } from "@ant-design/plots";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  data?: any;          // Dashboard stats (Admin/Staff)
  role: "Admin" | "Staff";
  report?: boolean;    // Show report bar chart if true
  reportData?: any;    // Data for report bar chart (staffSalesAgg)
};

const DashboardCharts = ({ data, role, report = false, reportData }: Props) => {
  const totalDays = new Date().getDate();
  console.log(data?.bikesSoldTotal)
  // --- LINE CHART DATA ---
  let staffDailySales: { day: number; sales: number }[] = [];

  if (role === "Staff") {
    staffDailySales =
      data?.recentSales?.reduce((acc: any, sale: any) => {
        const saleDate = new Date(sale.createdAt || sale.date);
        const day = saleDate.getDate();
        const existing = acc.find((d: any) => d.day === day);
        if (existing) existing.sales += 1;
        else acc.push({ day, sales: 1 });
        return acc;
      }, []) || [];
  }

  const rawDailySales = data?.dailySales || [];

  const salesData = Array.from({ length: totalDays }, (_, i) => {
    const dayNumber = i + 1;
    let sales = 0;

    if (role === "Admin") {
      const found = rawDailySales.find((item: any) => item?._id?.day === dayNumber);
      sales = found ? found.sales : 0;
    } else {
      const found = staffDailySales.find((item: any) => item.day === dayNumber);
      sales = found ? found.sales : 0;
    }

    return {
      day: `Day ${dayNumber}`,
      sales,
    };
  });

  const lineConfig = {
    data: salesData,
    xField: "day",
    yField: "sales",
    height: 250,
    smooth: true,
    point: { size: 4 },
    color: role === "Admin" ? "#1677ff" : "#52c41a",
  };

  // --- PIE CHART DATA ---
  const bikeStockData = [
    { type: "Available Bikes", value: data?.availableStock || 0 },
    {
      type: "Sold Bikes",
      value: role === "Admin" ? data?.totalSales || 0 : data?.recentSales?.length || 0,
    },
  ];

  let revenueData: { type: string; value: number }[] = [];

  if (role === "Admin") {
    revenueData =
      data?.bikeModelSales?.map((item: any) => ({
        type: item._id,
        value: item.value,
      })) || [];
  } else {
    const modelMap: Record<string, number> = {};
    data?.recentSales?.forEach((sale: any) => {
      const model = sale.bikeModel;
      if (modelMap[model]) modelMap[model] += 1;
      else modelMap[model] = 1;
    });
    revenueData = Object.keys(modelMap).map((key) => ({
      type: key,
      value: modelMap[key],
    }));
  }

  const COLORS_1 = ["#1677ff", "#52c41a"];
  const COLORS_2 = ["#fa8c16", "#13c2c2"];

  const renderInsideLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  // BAR CHART DATA (FOR REPORT ONLY)
 const staffSalesData = report
  ? (reportData?.staffSalesAgg || []).map((item: any) => ({
      staffName: item.staffName || "Unknown", 
      totalSales: item.totalSales || 0,
    }))
  : [];

  return (
    <>
      {/* LINE + PIE CHART*/}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card
            title={role === "Admin" ? "Monthly Sales Report" : "My Monthly Sales"}
            style={{ height: 300 }}
          >
            <Line {...lineConfig} />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Bike Stock Overview" style={{ height: 250 }}>
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bikeStockData}
                        dataKey="value"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label={renderInsideLabel}
                        labelLine={false}
                      >
                        {bikeStockData.map((_, index) => (
                          <Cell key={index} fill={COLORS_1[index]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                title={role === "Admin" ? "Top Selling Bike Models" : "My Top Selling Bikes"}
                style={{ height: 250 }}
              >
                <div style={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueData}
                        dataKey="value"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label={renderInsideLabel}
                        labelLine={false}
                      >
                        {revenueData.map((_, index) => (
                          <Cell key={index} fill={COLORS_2[index % COLORS_2.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* --- BAR CHART FOR STAFF SALES (REPORT ONLY) --- */}
      {report && staffSalesData.length > 0 && (
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <Card title="Staff Sales Performance">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={staffSalesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="staffName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#1677ff" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default DashboardCharts;
