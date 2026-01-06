import { Card, Table, Tag } from "antd";
import type { Props } from "../types/RecentSalestype";
import React from "react";


const RecentSalesTable = ({ sales, role, showAll = false }: Props) => {
  const columns = [
    { title: "Invoice No", dataIndex: "invoice", key: "invoice" },
    { title: "Customer Name", dataIndex: "customer", key: "customer" },
    { title: "Bike Model", dataIndex: "bike", key: "bike" },
    { title: "Amount (₹)", dataIndex: "amount", key: "amount" },
    {
      title: "Payment Mode",
      dataIndex: "payment",
      key: "payment",
      render: (payment: string) => (
        <Tag color={payment === "Online" ? "blue" : "green"}>{payment}</Tag>
      ),
    },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  const dataSource = sales.map((sale) => ({
    key: sale._id,
    invoice: sale.invoiceNo,
    customer: sale.customerName,
    bike: sale.bikeModel,
    amount: sale.totalAmount,
    payment: sale.paymentMode,
    date: new Date(sale.saleDate).toLocaleDateString(),
  }));

  return (
    <Card
      title={
        showAll
          ? "All Sales Records"
          : role === "Admin"
          ? "Recent Sales Activity"
          : "My Recent Sales"
      }
      style={{ marginTop: 16 }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={showAll ? { pageSize: 10, showSizeChanger: false } : false}
      />
    </Card>
  );
};

export default React.memo(RecentSalesTable);
