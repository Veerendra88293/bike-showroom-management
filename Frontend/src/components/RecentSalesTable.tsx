import { Card, Table, Tag } from "antd";

const RecentSalesTable = ({
  sales,
  role,
}: {
  sales: any[];
   role: "Admin" | "Staff";
}) => {
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
    <Card title={role === "Admin" ? "Recent Sales Activity" : "My Recent Sales"} style={{ marginTop: 16 }}>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </Card>
  );
};

export default RecentSalesTable;
