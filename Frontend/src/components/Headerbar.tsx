import { BellOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Drawer, List, Space, Tooltip, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  removeNotification,
  clearNotifications,
} from "../slice/services/notification";
import { memo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/jwt";

const HeaderBar = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  const role = decoded?.role;
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.list
  );

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", height: 64 }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          🏍 Java BikeShowRoom
        </div>

        <Space size="large" align="center">
          <Badge count={notifications.length} offset={[0, 4]}>
            <BellOutlined
              style={{ fontSize: 18, cursor: "pointer" }}
              onClick={() => setOpen(true)}
            />
          </Badge>
          <Tooltip title={`Role: ${role}`}>
            <Space align="center" style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <span>{localStorage.getItem("username")}</span>
            </Space>
          </Tooltip>
        </Space>
      </div>

      <Drawer
        title="Notifications"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        extra={
          <Button
            danger
            size="small"
            onClick={() => dispatch(clearNotifications())}
          >
            Clear All
          </Button>
        }
      >
        <List
          dataSource={notifications}
          locale={{ emptyText: "No notifications" }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <DeleteOutlined
                  onClick={() => dispatch(removeNotification(item.id))}
                  style={{ color: "red", cursor: "pointer" }}
                />,
              ]}
            >
              <List.Item.Meta title={item.message} description={item.time} />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default memo(HeaderBar);
