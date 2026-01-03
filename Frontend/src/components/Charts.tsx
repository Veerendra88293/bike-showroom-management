import { Card, Col, Row } from "antd";
import { Line } from "@ant-design/plots";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  data?: any;
  role: "Admin" | "Staff";
};

const DashboardCharts = ({ data, role }: Props) => {
// line chart daily

  const rawDailySales = data?.dailySales || [];

  // Current day of month (1–31)
  const totalDays = new Date().getDate();

 //fill missing day with 0
  const salesData = Array.from({ length: totalDays }, (_, i) => {
    const dayNumber = i + 1;
    const found = rawDailySales.find(
      (item: any) => item?._id?.day === dayNumber
    );

    return {
      day: `Day ${dayNumber}`,
      sales: found ? found.sales : 0,
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


//pie chart
  const bikeStockData = [
    { type: "Available Bikes", value: data?.availableStock || 0 },
    {
      type: "Sold Bikes",
      value:
        role === "Admin"
          ? data?.totalSales || 0
          : data?.bikesSoldToday || 0,
    },
  ];

  const revenueData =
    data?.bikeModelSales?.map((item: any) => ({
      type: item._id,
      value: item.value,
    })) || [];

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

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      {/* Line Chart */}
      <Col xs={24} md={12}>
        <Card
          title={role === "Admin" ? "Monthly Sales Report" : "My Monthly Sales"}
          style={{ height: 300 }}
        >
          <Line {...lineConfig} />
        </Card>
      </Col>

      {/* Pie Charts */}
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
              title={
                role === "Admin"
                  ? "Top Selling Bike Models"
                  : "My Top Selling Bikes"
              }
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
                        <Cell key={index} fill={COLORS_2[index]} />
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
  );
};

export default DashboardCharts;
