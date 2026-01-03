import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";

const HeaderBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        height: 64,
      }}
    >
      {/* Left - Title */}
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        🏍 Java BikeShowRoom
      </div>

      {/* Right - Notification & User */}
      <Space size="large">
        <Badge count={2}>
          <BellOutlined style={{ fontSize: 18 }} />
        </Badge>

        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>Admin</span>
        </Space>
      </Space>
    </div>
  );
};

export default HeaderBar;
