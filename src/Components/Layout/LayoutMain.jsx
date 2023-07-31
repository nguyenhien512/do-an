import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { NavLink } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { ROLE } from '../../util/enum'
import { USER_SIDEBAR, ADMIN_SIDEBAR } from '../../util/enum'
import './LayoutMain.css';
import { useNavigate } from "react-router-dom";
import hien from '../../Hien-01.svg'

const { Header, Sider, Content } = Layout;
function LayoutMain({ title, content }) {
  // console.log("content ",content)
  const { user } = useAuth();
  //user.role[0].authority
  let role = user.authority;
  console.log("check user ", user)
  const navigate = useNavigate();

  let renderContent = (role == ROLE.TEACHER) ? ADMIN_SIDEBAR : USER_SIDEBAR
  console.log("render content ", renderContent)

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

            <Button
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
              Logout
            </Button>
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
    </Layout>
  );
}

export default LayoutMain