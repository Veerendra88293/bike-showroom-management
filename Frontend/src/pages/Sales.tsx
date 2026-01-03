import {
  Card,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  InputNumber,
  Row,
  Col,
  message,
} from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  useCreateSalesMutation,
  useGetSalesQuery,
} from "../slice/services/salesApi";
import { useGetBikesQuery } from "../slice/services/bikeApi";

const { Option } = Select;

const Sales = () => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const {
    data: salesData = [],
    isLoading: salesLoading,
    error: salesError,
  } = useGetSalesQuery();
  const [createSales] = useCreateSalesMutation();
  const {
    data: bikes = [],
    isLoading: bikesLoading,
    error: bikesError,
  } = useGetBikesQuery();
  console.log(bikes, "kajbckdbhci");

  const columns = [
    {
      title: "Invoice No",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Bike Model",
      dataIndex: "bikeModel",
      key: "bikeModel",
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount (₹)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Total (₹)",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Payment",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (payment: string) => (
        <Tag color={payment === "Online" ? "blue" : "green"}>{payment}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedSale(record);
            setInvoiceModalOpen(true);
          }}
        >
          View Invoice
        </Button>
      ),
    },
  ];

  const handleAddSale = async (values: any) => {
    try {
      await createSales({
        ...values,
        soldBy: localStorage.getItem("role") === "host" ? "Admin" : "Staff",
      }).unwrap(); // unwrap lets us catch backend errors
      message.success("Sale created successfully!");
      setIsModalOpen(false);
    } catch (err: any) {
      if (err?.status === 401) {
        message.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (err?.data?.message) {
        message.error(err.data.message);
      } else {
        message.error("Failed to create sale");
      }
    }
  };
  if (bikesError && (bikesError as any).status === 401) {
    message.error("Session expired. Please login again.");
    localStorage.removeItem("token");
  }

  if (salesError && (salesError as any).status === 401) {
    message.error("Session expired. Please login again.");
    localStorage.removeItem("token");
  }

  return (
    <DashboardLayout>
      <Card
        title="All Sales"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            New Sale
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={salesData}
          loading={salesLoading}
        />
      </Card>

      {/*Invoice Preview Modal */}
      <Modal
        open={invoiceModalOpen}
        onCancel={() => setInvoiceModalOpen(false)}
        footer={[
          <Button key="print" type="primary" onClick={() => window.print()}>
            Print Invoice
          </Button>,
        ]}
        width={700}
      >
        {selectedSale && (
          <div id="invoice">
            <h2 style={{ textAlign: "center" }}>Bike Showroom Invoice</h2>
            <hr />

            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <b>Invoice No:</b> {selectedSale.invoiceNo}
                </p>
                <p>
                  <b>Date:</b>{" "}
                  {new Date(selectedSale.createdAt).toLocaleString()}
                </p>
              </Col>
              <Col span={12}>
                <p>
                  <b>Customer:</b> {selectedSale.customerName}
                </p>
                <p>
                  <b>Payment:</b> {selectedSale.paymentMode}
                </p>
              </Col>
            </Row>

            <Table
              pagination={false}
              dataSource={[
                {
                  key: "1",
                  bike: selectedSale.bikeModel,
                  amount: selectedSale.price,
                },
              ]}
              columns={[
                { title: "Bike Model", dataIndex: "bike" },
                { title: "Price (₹)", dataIndex: "amount" },
              ]}
            />

            <h3 style={{ textAlign: "right", marginTop: 20 }}>
              Total: ₹{selectedSale.totalAmount}
            </h3>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              Thank you for your purchase!
            </p>
          </div>
        )}
      </Modal>

      {/*Add Sale Modal */}
      <Modal
        title="New Sale / Invoice"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddSale}>
          <Form.Item
            label="Customer Name"
            name="customer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Bike Model"
            name="bikeId"
            rules={[{ required: true, message: "Please select a bike" }]}
          >
            <Select
              placeholder="Select Bike"
              loading={bikesLoading}
              onChange={(bikeId) => {
                const bike = bikes.find((b: any) => b._id === bikeId);
                if (bike) {
                  form.setFieldsValue({ price: bike.price }); // auto-fill price
                }
              }}
            >
              {bikes.map((bike: any) => (
                <Option key={bike._id} value={bike._id}>
                  {bike.bikemodel}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price (₹)"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Discount in (₹)"
            name="discount"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Payment Mode"
            name="payment"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="Showroom">Showroom</Option>
              <Option value="Online">Online</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Generate Bill
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default Sales;
