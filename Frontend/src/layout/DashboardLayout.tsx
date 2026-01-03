import { Divider, Layout } from "antd";
import HeaderBar from "../components/Headerbar";
import MenuBar from "../components/MenuBar";

const { Header, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Header style={{ background: "#fff", padding: "0 8px" }}>
          <HeaderBar />
        </Header>
        <Divider style={{ margin: 0 }} />
        <MenuBar />
        <Content style={{ padding: "0px 10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
