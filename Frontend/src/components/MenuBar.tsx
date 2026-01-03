import {
  DashboardOutlined,
  CarOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../slice/api/api";

const MenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  // Get current route name
  const selectedKey = location.pathname.split("/")[1] || "dashboard";

  const handleMenuClick = ({ key }: any) => {
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
