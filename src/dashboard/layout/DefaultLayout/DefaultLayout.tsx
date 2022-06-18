import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import React from "react"
import "./defaultLayout.scss"
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom"
import Dashboard from "../../pages/Dashboard"
import Facebook from "../../pages/Facebook"

const { Header, Content, Footer, Sider } = Layout


const routers = [{
  path: "/",
  Component: Dashboard,
  index: true
}, {
  path: "/facebook",
  Component: Facebook
}]

const routerList = routers.map((router) => {
  const { path, Component, ...additions } = router

  console.log({additions});

  return (<Route path={path} element={<Component />} {...additions} />)
})

const DefaultLayout: React.FC = () => (
  <Router>
    <Layout>

      <Link to="/facebook">About</Link>

      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
      >
        <div className="logo">
          <img src="/icon128.png" alt="logo" />
          <span>FABI Toolkit</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`
            })
          )}
        />
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Routes>
              {routerList}
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  </Router>
)

export default DefaultLayout
