import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Typography, message } from 'antd';
import { NavLink } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { ADMIN_SIDEBAR, ROLE } from '../../util/enum'
import { STUDENT_SIDEBAR, TEACHER_SIDEBAR } from '../../util/enum'
import './LayoutMain.css';
import { useNavigate } from "react-router-dom";
import hien from '../../Hien-01.svg'
import UpdateUserModal from '../RegisterModal/UpdateUserModal';
import {callGetCurrentUser, callUpdateUser} from '../../Pages/manage-user/UserApi'

const { Header, Sider, Content } = Layout;
function LayoutMain({ title, content }) {
  const { user } = useAuth();
  //user.role[0].authority
  let role = user.authority;
  const navigate = useNavigate();

  let renderContent = (role == ROLE.ADMIN) ? ADMIN_SIDEBAR : (role == ROLE.TEACHER ? TEACHER_SIDEBAR : STUDENT_SIDEBAR)
  console.log("render content ", renderContent)

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const token = localStorage.getItem("token");

  const [openUpdateUserPopup, setOpenUpdateUserPopup] = useState(false);

  const [profile, setProfile] = useState();

  useEffect(() => {
    async function fetchData() {
        try {
            const data = await callGetCurrentUser(token);
            setProfile(data);
        } catch (ignored) {
            message.error(ignored.message)
         }
    }
    fetchData();
  }, [])

  const updateUser = async (formData) => {
    console.log(formData)
    try {
      const updatedUser = await callUpdateUser(formData, token);
      setProfile(updatedUser);
      setOpenUpdateUserPopup(false);
      message.info('Đổi thông tin đăng nhập thành công')
    } catch (ignored) {
      message.error(ignored.message)
    }
  }

  return (
    <Layout style={{
      minHeight: '100vh',
    }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" >
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <img src={hien} alt='logo' width='60%'></img>
            {collapsed ? null : <p className='text-center' style={{ color: '#ffffff', fontSize: '1.5em' }}>Exam System</p>}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['0']}
          items={
            renderContent.map((item, index) => {
              return {
                key: index,
                icon: <UserOutlined />,
                label: <NavLink to={item.route} className='nav-item  nav-item-custom'>{item.content}</NavLink>
              }
            })
          }
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className='flex flex-box'>
            <div className='d-inline-flex align-items-center'>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,

                }}
              />
              <Button onClick={() => navigate(-1)}>Quay lại</Button>
            </div>
            <span style={{ fontSize: '1.5em' }}>{title}</span>
            <div className='d-inline-flex align-items-center'>
              <Typography.Link onClick={() => setOpenUpdateUserPopup(true)}>
                Đổi thông tin đăng nhập
              </Typography.Link>
              <Button className='ms-3'
                type="text"
                icon={<div className='iconDiv'><LogoutOutlined />
                </div>
                }
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate('/')
                }}
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                  verticalAlign: 'center',
                  width: 100,
                  height: 64,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                Đăng xuất
              </Button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 550,
            background: colorBgContainer,
          }}
        >
          {content}
        </Content>
      </Layout>
      <UpdateUserModal open={openUpdateUserPopup} handleCancel={() => setOpenUpdateUserPopup(false)} handleOk={updateUser} initData={profile}/>
    </Layout>
  );
}

export default LayoutMain