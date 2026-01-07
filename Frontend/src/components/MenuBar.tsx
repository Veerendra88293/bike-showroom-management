import {
  DashboardOutlined,
  CarOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../slice/api/api";
import type { JwtPayload } from "../types/jwt";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/getToken";

const MenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = getToken()
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  const role = decoded?.role;

  // Get current route name
  const selectedKey = location.pathname.split("/")[1] || "dashboard";

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      localStorage.clear();
      dispatch(api.util.resetApiState());
      navigate("/login");
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <Menu
      mode="horizontal"
      onClick={handleMenuClick}
      selectedKeys={[selectedKey]}
      style={{ borderBottom: "none" }}
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>

      <Menu.Item key="bikes" icon={<CarOutlined />}>
        Bikes
      </Menu.Item>

      <Menu.Item key="sales" icon={<ShoppingCartOutlined />}>
        Sales
      </Menu.Item>

      <Menu.Item key="customers" icon={<TeamOutlined />}>
        Customers
      </Menu.Item>

      {role === "Admin" && (
        <Menu.Item key="employees" icon={<UserOutlined />}>
          Employees
        </Menu.Item>
      )}

      {role === "Admin" && (
        <Menu.Item key="reports" icon={<BarChartOutlined />}>
          Reports
        </Menu.Item>
      )}

      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default MenuBar;
