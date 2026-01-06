import { Card, Col, Row, Statistic } from "antd";
import React, { memo } from "react";
import {
  ShoppingCartOutlined,
  TeamOutlined,
  DollarOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import type {
  AdminDashboardData,
  ReportDashboardData,
  StaffDashboardData,
} from "../types/cardType";

type Props = {
  data: AdminDashboardData | ReportDashboardData | StaffDashboardData;
  loading: boolean;
  role: "Admin" | "Staff";
  report?: boolean;
};

const DashboardCards = ({ data, loading, role, report = false }: Props) => {
  if (report) {
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
              title="Bikes Sold Total"
              value={data?.bikesSoldTotal || 0}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card loading={loading}>
            <Statistic
              title="Total Customers"
              value={data?.totalCustomers || 0}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card loading={loading}>
            {data && "totalStaff" in data && (
              <Statistic
                title="Total Staff"
                value={data?.totalStaff || 0}
                prefix={<TeamOutlined />}
              />
            )}
          </Card>
        </Col>

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

        <Col xs={24} sm={12} md={8} lg={4}>
          <Card loading={loading}>
            <Statistic
              title="Total Bikes"
              value={data?.totalBikes || 0}
              prefix={<span style={{ fontSize: 18 }}>🏍️</span>}
            />
          </Card>
        </Col>
      </Row>
    );
  }

  // ---------- DEFAULT ADMIN / STAFF DASHBOARD CARDS ----------
  return (
    <Row gutter={[16, 16]}>
      {/* Available Bikes */}
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          <Statistic
            title="Available Bikes"
            value={data?.availableStock || 0}
            prefix={<span style={{ fontSize: 18 }}>🏍️</span>}
          />
        </Card>
      </Col>

      {/* Bikes Sold Today */}
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          {data && "bikesSoldToday" in data && (
            <Statistic
              title="Bikes Sold Today"
              value={data?.bikesSoldToday || 0}
              prefix={<ShoppingCartOutlined />}
            />
          )}
        </Card>
      </Col>

      {/* Customers */}
      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          <Statistic
            title={role === "Admin" ? "Total Customers" : "Customers Handled"}
            value={data?.totalCustomers || 0}
            prefix={<TeamOutlined />}
          />
        </Card>
      </Col>

      {/* Admin-only Cards */}
      {role === "Admin" && (
        <>
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

          <Col xs={24} sm={12} md={8} lg={4}>
            <Card loading={loading}>
              {data && "lowStock" in data && (
                <Statistic
                  title="Low Stock Bikes"
                  value={data?.lowStock || 0}
                  prefix={<WarningOutlined />}
                />
              )}
            </Card>
          </Col>
        </>
      )}

      {/* Staff-only Cards */}
      {role === "Staff" && (
        <>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Card loading={loading}>
              <Statistic
                title="Total Bikes Handled"
                value={data?.totalBikes || 0}
                prefix={<span style={{ fontSize: 18 }}>🏍️</span>}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <Card loading={loading}>
              {data && "totalSales" in data && (
                <Statistic
                  title="Total Sales This Month"
                  value={data?.totalSales || 0}
                  prefix={<ShoppingCartOutlined />}
                />
              )}
            </Card>
          </Col>
        </>
      )}

      <Col xs={24} sm={12} md={8} lg={4}>
        <Card loading={loading}>
          {data && "totalSales" in data && (
            <Statistic
              title={
                role === "Admin"
                  ? "Total Sales Records"
                  : "Today’s Sales Amount"
              }
              value={
                role === "Admin" ? data?.totalSales : data?.totalRevenue || 0
              }
              prefix={<ShoppingCartOutlined />}
              suffix={role === "Staff" ? "₹" : undefined}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default memo(DashboardCards);
