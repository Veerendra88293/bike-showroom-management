import { Card, Table, Button, Space, Modal, Form, Input, message } from "antd";
import { UserAddOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useDeleteCustomerMutation,
} from "../slice/services/customerApi";

const { confirm } = Modal;

const Customers = () => {
  const { data: customers = [], isLoading } = useGetCustomersQuery();
  const [addCustomer] = useAddCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Purchased Bike",
      dataIndex: "purchasedBike",
      key: "purchasedBike",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
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

  const handleAddCustomer = async (values: any) => {
    console.log("Adding customer:", values);

    try {
      await addCustomer(values).unwrap();

      message.success("Customer added successfully");
      setIsModalOpen(false);
    } catch (error: any) {
      message.error(error?.data?.message || "Customer already exists");
    }
  };

  const showDeleteConfirm = (customer: any) => {
    confirm({
      title: "Delete Customer",
      content: `Delete ${customer.name}?`,
      okType: "danger",
      onOk() {
        deleteCustomer(customer._id);
      },
    });
  };

  return (
    <DashboardLayout>
      <Card
        title="Customer Management"
        extra={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Customer
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={customers}
          pagination={false}
          loading={isLoading}
        />
      </Card>

      <Modal
        title="Add New Customer"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddCustomer}>
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[{ required: true, message: "Please enter customer name" }]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item label="Purchased Bike" name="bike">
            <Input placeholder="Enter bike model" />
          </Form.Item>

          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Customer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default Customers;
