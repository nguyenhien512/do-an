import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import useAuth from "../../hooks/useAuth";
import { authenticate, registerUser } from "../../services";
import "./login.css";
import ModalComponent from "../../Components/RegisterModal/ModalComponent";
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode";

function LoginPage() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);


  const { setToken } = useAuth();
  const navigate = useNavigate();


  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };
  const onFinish = async (user) => {

    try {
      const response = await authenticate(user);
      setToken(response.data.jwttoken)
      localStorage.setItem('token', response.data.jwttoken)

      let location = response.data.authority == 'STUDENT' ? "/user" : "/teacher"
      navigate(location)

    } catch (error) {
      if (error?.response?.data?.status === 401) {
        toast.error(`${error?.response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error(`Internal server error !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const handlePopupCancel = () => {
    setIsModalOpen(false);
  };
  const handleRegisterSubmit = async (value) => {
    try {
      const response = await registerUser(value);
      toast.success("Register successfully !", {
        position: toast.POSITION.TOP_CENTER
      });
      // call api login
      let authenticateUser = {
        username: response.data.username,
        password: response.data.password
      }
      let authenResponse = await authenticate(authenticateUser)
      setToken(authenResponse.data.jwttoken)
      localStorage.setItem('token', authenResponse.data.jwttoken)
      let location = response.data.authority == 'STUDENT' ? "/user" : "/teacher"
      navigate(location)

    } catch (error) {
      if (error?.response?.data?.status === 401) {
        toast.error(`${error?.response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        toast.error(`Internal server error !!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };





  return (
    <section className="login-page">
      <ModalComponent isOpen={isModalOpen} handlePopupCancel={handlePopupCancel} handleRegisterSubmit={handleRegisterSubmit} />
      <h1>Đăng nhập</h1>
      <Form onFinish={onFinish} className="login-form pt-3">
        <Form.Item name="username">
          <Input
            name="username"
            onChange={handleChange}
            size="large"
            placeholder="Username"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            name="password"
            onChange={handleChange}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div className="center-button">
            <Button
              type="primary"
              htmlType="submit"
              disabled={!login.username || !login.password}
            >
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
      <a href="#" onClick={() => setIsModalOpen(true)}>Bạn chưa có tài khoản ? tạo một tài khoản mới</a>
      <ToastContainer />

    </section>
  );
}

export default LoginPage;
