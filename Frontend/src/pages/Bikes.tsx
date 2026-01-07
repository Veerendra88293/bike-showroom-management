import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Tag,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  useGetBikesQuery,
  useAddBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
} from "../slice/services/bikeApi";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/jwt";
import { getToken } from "../utils/getToken";
export interface Bike {
  _id: string;
  bikemodel: string;
  company: string;
  engine: number;
  color?: string;
  price: number;
  stock: number;
}
const { confirm } = Modal;

const Bikes = () => {
  const token = getToken();
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  const role = decoded?.role;
  const [searchText, setSearchText] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [stockFilter, setStockFilter] = useState<"LOW" | null>(null);

  const { data: bikes = [], isLoading } = useGetBikesQuery();
  const [addBike] = useAddBikeMutation();
  const [updateBike] = useUpdateBikeMutation();
  const [deleteBike] = useDeleteBikeMutation();

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Model Name",
      dataIndex: "bikemodel",
      key: "bikemodel",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Engine (CC)",
      dataIndex: "engine",
      key: "engine",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <Tag color={stock > 5 ? "green" : "red"}>{stock}</Tag>
      ),
    },
    role === "Admin"
      ? {
          title: "Action",
          key: "action",
          render: (_, record: Bike) => (
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setSelectedBike(record);
                  form.setFieldsValue(record);
                  setIsEditModalOpen(true);
                }}
              >
                Edit
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(record)}
              >
                Delete
              </Button>
            </Space>
          ),
        }
      : {},
  ].filter(Boolean);

  const handleAddBike = async (values: Bike) => {
    await addBike(values);
    setIsAddModalOpen(false);
  };

  const handleEditBike = async (values: Partial<Bike>) => {
    if (!selectedBike) return;

    await updateBike({ id: selectedBike._id, ...values });
    setIsEditModalOpen(false);
  };

  const showDeleteConfirm = (bike: Bike) => {
    confirm({
      title: "Delete Bike",
      content: `Delete ${bike.bikemodel}?`,
      okType: "danger",
      onOk() {
        deleteBike(bike._id);
      },
    });
  };
  const filteredBikes = bikes
    .filter(
      (bike: Bike) =>
        bike.bikemodel.toLowerCase().includes(searchText.toLowerCase()) ||
        bike.company.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((bike) => (stockFilter === "LOW" ? bike.stock <= 5 : true));

  return (
    <DashboardLayout>
      <Input
        placeholder="Search by Model or Company"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, margin: 10 }}
      />
      <Select
        placeholder="Filter by Stock"
        allowClear
        value={stockFilter}
        onChange={(value) => setStockFilter(value)}
        options={[{ label: "Low Stock (≤ 5)", value: "LOW" }]}
      />
      <Card
        title="Bike Management"
        extra={
          role === "Admin" && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Bike
            </Button>
          )
        }
      >
        <Table<Bike>
          columns={columns}
          dataSource={filteredBikes}
          pagination={{ pageSize: 5 }}
          loading={isLoading}
        />
      </Card>

      {/* ADD BIKE MODAL */}
      <Modal
        title="Add New Bike"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddBike}>
          <Form.Item
            label="Model Name"
            name="bikemodel"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Engine (CC)"
            name="engine"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Input />
          </Form.Item>

          <Form.Item
            label="Price (₹)"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Stock" name="stock" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Bike
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 🔹 EDIT BIKE MODAL (ADMIN) */}
      <Modal
        title="Edit Bike"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleEditBike}>
          <Form.Item label="Model Name" name="model">
            <Input />
          </Form.Item>

          <Form.Item label="Company" name="company">
            <Input />
          </Form.Item>

          <Form.Item label="Engine (CC)" name="engine">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Input />
          </Form.Item>

          <Form.Item label="Price (₹)" name="price">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Stock" name="stock">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update Bike
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default Bikes;
