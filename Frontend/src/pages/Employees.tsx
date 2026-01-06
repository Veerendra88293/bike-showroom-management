import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import {
  useGetStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useToggleStaffStatusMutation,
} from "../slice/services/employeeApi";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import type { ColumnsType } from "antd/es/table";
import type { AddStaffPayload, Staff } from "../types/staffType";

const { Option } = Select;
const { confirm } = Modal;

const Employees = () => {
  const { data: staffList = [] } = useGetStaffQuery();
  const [addStaff] = useAddStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleStaffStatus] = useToggleStaffStatusMutation();

  const columns: ColumnsType<Staff> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="blue">{role.toUpperCase()}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean, record: Staff) => (
        <>
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Tag>

          <Button
            size="small"
            type="link"
            onClick={() => toggleStaffStatus(record._id)}
          >
            {isActive ? "Disable" : "Enable"}
          </Button>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: Staff) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddStaff = async (values: AddStaffPayload) => {
    await addStaff(values);
    setIsModalOpen(false);
  };

  const showDeleteConfirm = (staff: Staff) => {
    confirm({
      title: "Delete Staff",
      content: `Are you sure you want to delete ${staff.name}?`,
      okType: "danger",
      onOk() {
        deleteStaff(staff._id);
      },
    });
  };

  return (
    <DashboardLayout>
      <Card
        title="Employee Management"
        extra={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Staff
          </Button>
        }
      >
        <Table<Staff>
          rowKey="_id"
          columns={columns}
          dataSource={staffList}
          pagination={false}
        />
      </Card>

      {/* Add Staff Modal */}
      <Modal
        title="Add New Staff"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddStaff}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter staff name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item label="Role" name="role" initialValue="staff">
            <Select disabled>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Staff
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default Employees;
