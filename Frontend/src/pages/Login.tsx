import {
  Card,
  Button,
  Form,
  Input,
  Flex,
  Space,
  Radio,
  Alert,
  message,
} from "antd";
import LoginImage from "../assets/LoginImage.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginMutation } from "../slice/api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface LoginProps {
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
}
function Login({ setToken, setRole }: LoginProps) {
  const [errorState, setError] = useState();

  const [login, { error }] = useLoginMutation();
  const navigate = useNavigate();
  const handleSubmit = async (value: {
    username: string;
    password: string;
    role: string;
  }) => {
    try {
      const res = await login(value).unwrap();
      console.log("LOGIN SUCCESSFUL", res);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("username", res.username);
      setToken(res.token);
      setRole(res.role);
      message.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      message.error(err.data?.message)
      setError(err.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#F3F2F0" }}>
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
          <Card title="Login Page" style={{ width: 800 }}>
            {error && <Alert type="error" message={errorState} />}

            <Flex gap="large" align="center">
              <img
                src={LoginImage}
                alt="Login Illustration"
                style={{ width: 350 }}
              />
              <Card hoverable style={{ width: 350 }} bordered={true}>
                <Form onFinish={handleSubmit} layout="vertical">
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        { required: true, message: "Username is required" },
                      ]}
                    >
                      <Input placeholder="username" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                        {
                          min: 8,
                          message: "Password must be at least 8 characters",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Password"
                        prefix={<LockOutlined />}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Login As"
                      name="role"
                      rules={[
                        { required: true, message: "Please select role" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="Admin">Host (Admin)</Radio>
                        <Radio value="Staff">Staff</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Space>
                </Form>
              </Card>
            </Flex>
          </Card>
        </Flex>
      </div>
    </>
  );
}

export default Login;
