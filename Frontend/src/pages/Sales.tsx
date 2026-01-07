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
import { addNotification } from "../slice/services/notification";
import { useDispatch } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import type { JwtPayload } from "../types/jwt";
import { jwtDecode } from "jwt-decode";
import { useGetCustomersQuery } from "../slice/services/customerApi";
import type { Customer } from "../types/customerPageType";
import type { ApiError } from "../types/apiError";
import type { CreateSalePayload, Sale } from "../types/salesType";
import { getToken } from "../utils/getToken";
const { Option } = Select;
//Sale coming FROM backend (table, invoice)

const Sales = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const { data: customers = [], isLoading: customersLoading } =
    useGetCustomersQuery();
  const { data: salesData = [], isLoading: salesLoading } = useGetSalesQuery();
  const [createSales] = useCreateSalesMutation();
  const { data: bikes = [], isLoading: bikesLoading } = useGetBikesQuery();

  const columns: ColumnsType<Sale> = [
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
      render: (_, record) => (
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

  const handleAddSale = async (values: CreateSalePayload) => {
    const token = getToken();
    const decoded = token ? jwtDecode<JwtPayload>(token) : null;
    const role = decoded?.role;
    try {
      await createSales({
        ...values,
        soldBy: role === "Admin" ? "Admin" : "Staff",
      }).unwrap(); // unwrap lets us catch backend errors
      message.success("Sale created successfully!");
      dispatch(
        addNotification({
          id: Date.now().toString(),
          message: "New bike sale completed",
          type: "SALE",
          time: new Date().toLocaleString(),
        })
      );
      setIsModalOpen(false);
    } catch (err: unknown) {
      const error = err as ApiError;

      if (error.status === 401) {
        message.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (error.data?.message) {
        message.error(error.data.message);
        return;
      }

      message.error("Failed to create sale");
    }
  };

  const filteredSales = salesData.filter((sale) => {
    const matchesSearch =
      sale.invoiceNo.toLowerCase().includes(searchText.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      sale.bikeModel.toLowerCase().includes(searchText.toLowerCase());
    const matchesPayment = paymentFilter
      ? sale.paymentMode === paymentFilter
      : true;

    return matchesSearch && matchesPayment;
  });

  return (
    <DashboardLayout>
      <Space style={{ margin: 16 }} size="large">
        <div>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
            Search
          </div>
          <Input
            placeholder="Invoice / Customer / Bike"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 260 }}
          />
        </div>

        {/* 🎚 Filter */}
        <div>
          <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>
            Payment Filter
          </div>
          <Select
            placeholder="Select payment mode"
            allowClear
            style={{ width: 180 }}
            onChange={(value) => setPaymentFilter(value)}
          >
            <Option value="Online">Online</Option>
            <Option value="Showroom">Showroom</Option>
          </Select>
        </div>
      </Space>
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
          dataSource={filteredSales}
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
            label="Customer"
            name="customer"
            rules={[{ required: true, message: "Please select customer" }]}
          >
            <Select
              placeholder="Select Customer"
              loading={customersLoading}
              showSearch
              optionFilterProp="label"
            >
              {customers.map((customer: Customer) => (
                <Select.Option
                  key={customer._id}
                  value={customer.name} // 👈 send name to backend
                  label={customer.name}
                >
                  {customer.name} ({customer.phone})
                </Select.Option>
              ))}
            </Select>
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
                const bike = bikes.find((b) => b._id === bikeId);
                if (bike) {
                  form.setFieldsValue({ price: bike.price }); // auto-fill price
                }
              }}
            >
              {bikes.map((bike) => (
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
