import { FacebookFilled, HomeOutlined, UserOutlined } from "@ant-design/icons"
import { Layout, Menu } from "antd"
import React from "react"
import "./defaultLayout.scss"
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom"
import Dashboard from "@pages/Dashboard"
import InteractionScan from "@pages/Facebook/InteractionScan"

const { Header, Content, Footer, Sider } = Layout


const routers = [{
  path: "/",
  Component: Dashboard,
  index: true
}, {
  path: "/facebook/interaction-scan",
  Component: InteractionScan
}]

const routerList = routers.map((router) => {
  const { path, Component, ...additions } = router
  return (<Route path={path} element={<Component />} {...additions} />)
})

const menuItems = [{
  url: "/",
  label: "Dashboard",
  icon: UserOutlined
}]

const DefaultLayout: React.FC = () => {

  return (
    <Router>
      <Layout>
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
          <Menu theme="dark" mode="inline">
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.SubMenu title="Facebook" icon={<FacebookFilled />}>
              <Menu.Item>
                <Link to="/facebook/interaction-scan">Interaction Scanner</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
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
          <Footer style={{ textAlign: "center" }}>FABI Toolkit by James Nguyen (jamesngdev)</Footer>
        </Layout>
      </Layout>
    </Router>
  )
}

export default DefaultLayout
