import { Card, Col, Row, Statistic } from "antd";
import {
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  WarningOutlined,
} from "@ant-design/icons";

type Props = {
  data: any;
  loading: boolean;
  role: "Admin" | "Staff";
};

const DashboardCards = ({ data, loading, role }: Props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          <Statistic
            title="Available Bikes"
            value={data?.availableStock || 0}
            prefix={<span style={{ fontSize: 18 }}>🏍️</span>}
          />
        </Card>
      </Col>


      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          <Statistic
            title="Bikes Sold Today"
            value={data?.bikesSoldToday || 0}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
      </Col>


      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          <Statistic
            title={role === "Admin" ? "Total Customers" : "Customers Handled"}
            value={data?.totalCustomers || 0}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>


      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          <Statistic
            title={
              role === "Admin" ? "Total Sales Records" : "Today’s Sales Amount"
            }
            value={
              role === "Admin" ? data?.totalSales : data?.totalRevenue || 0
            }
            prefix={<ShoppingCartOutlined />}
            suffix={role === "Staff" ? "₹" : undefined}
          />
        </Card>
      </Col>


      {role === "Admin" && (
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card loading={loading}>
            <Statistic
              title="Total Revenue"
              value={data?.totalRevenue || 0}
              prefix={<DollarOutlined />}
              suffix="₹"
            />
          </Card>
        </Col>
      )}


      {role === "Admin" && (
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card loading={loading}>
            <Statistic
              title="Low Stock Bikes"
              value={data?.lowStock || 0}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default DashboardCards;
