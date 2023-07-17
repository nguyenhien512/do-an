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
import {ROLE} from '../../util/enum'
import {USER_SIDEBAR,ADMIN_SIDEBAR} from '../../util/enum'
import  './LayoutMain.css';
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
function LayoutMain({content}){
  // console.log("content ",content)
  const {user} = useAuth();
  //user.role[0].authority
  let role =user.authority ;
  console.log("check user ",user)
  const navigate = useNavigate();

  let renderContent = (role == ROLE.TEACHER) ? ADMIN_SIDEBAR : USER_SIDEBAR
  console.log("render content ",renderContent)

    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={
                renderContent.map((item,index)=>{
                  return {
                    key: index,
                    icon: <UserOutlined />,
                    label: <NavLink to={item.route}  className='nav-item  nav-item-custom'>{item.content}</NavLink>,
  
                  }
                })
              
            }
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className='flex flex-box'>
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
                 <Button
                type="text"
                icon={<div className='iconDiv'><LogoutOutlined />
                </div>
                  }
                onClick={() =>{
                  localStorage.removeItem("token");
                  navigate('/')
                }}
                style={{
                  fontSize: '16px',
                  textAlign:'center',
                  verticalAlign:'center',
                  width: 100,
                  height: 64,
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  textAlign : 'center'
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