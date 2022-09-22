import React from 'react';
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { FacebookFilled, HomeOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, Typography } from 'antd';
import routers from '../../routers';
import { getFacebookAvatar } from '@helpers/image';
import { RootState } from '@redux/reducers';
import './defaultLayout.scss';
import { useSelector } from 'react-redux';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const routerList = routers.map(router => {
    const { path, Component, ...additions } = router;
    return <Route path={path} element={<Component />} {...additions} />;
});

const DefaultLayout: React.FC = () => {
    const pageTitle = useSelector<RootState>(
        state => state.app.pageTitle,
    ) as string;

    return (
        <Router>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    width={260}
                >
                    <Link to={'/'}>
                        <div className="logo">
                            <img src="/icon128.png" alt="logo" />
                            <span>FABI Toolkit</span>
                        </div>
                    </Link>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item icon={<HomeOutlined />}>
                            <Link to="/">Dashboard</Link>
                        </Menu.Item>
                        <Menu.SubMenu
                            title="Facebook"
                            icon={<FacebookFilled />}
                        >
                            <Menu.Item>
                                <Link to="/facebook/interaction-scan">
                                    Interaction Scanner
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to="/facebook/friends-remover">
                                    Friends Remover
                                </Link>
                            </Menu.Item>

                            <Menu.Item>
                                <Link to="/facebook/liked-page-stalk">
                                    Liked Page Stalk
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{ padding: 0 }}
                    >
                        <div className="nav_profile">
                            <div className="title">
                                <Title level={3}>{pageTitle}</Title>
                            </div>
                            <div className="profile">
                                <Avatar
                                    size={'large'}
                                    src={getFacebookAvatar('4')}
                                />
                                <Title level={5}></Title>
                            </div>
                        </div>
                    </Header>

                    <Content>
                        <div
                            className="site-layout-background"
                            style={{ minHeight: 360 }}
                        >
                            <Routes>{routerList}</Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default DefaultLayout;
