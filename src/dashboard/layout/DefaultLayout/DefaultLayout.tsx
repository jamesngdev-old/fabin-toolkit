import { FacebookFilled, HomeOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu, PageHeader, Spin, Typography } from 'antd';
import React from 'react';
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Dashboard from '@pages/Dashboard';
import InteractionStalk from '@pages/Facebook/InteractionStalk';
import { observer } from 'mobx-react';
import { AppStore } from '../../stores/app.store';
import Facebook from '@helpers/facebook';
import './defaultLayout.scss';
import FriendsRemover from '@pages/Facebook/FriendsRemover';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const routers = [
    {
        path: '/',
        Component: Dashboard,
        index: true,
    },
    {
        path: '/facebook/interaction-scan',
        Component: InteractionStalk,
    },
    {
        path: '/facebook/friends-remover',
        Component: FriendsRemover,
    },
];

const routerList = routers.map(router => {
    const { path, Component, ...additions } = router;
    return <Route path={path} element={<Component />} {...additions} />;
});

const appStore = new AppStore();

const DefaultLayout: React.FC = observer(() => {
    const facebook = new Facebook();

    // useEffect(() => {
    //     appStore.isLoading = true;
    //     facebook.getUserInfo().then(info => {
    //         appStore.isLoading = false;
    //         appStore.facebookUserInfo = info;
    //     });
    // }, []);

    if (appStore.isLoading) {
        return <Spin />;
    }

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
                >
                    <div className="logo">
                        <img src="/icon128.png" alt="logo" />
                        <span>FABI Toolkit</span>
                    </div>
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
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{ padding: 0 }}
                    >
                        <div className="nav_profile">
                            <Avatar
                                src={`https://graph.facebook.com/${appStore?.facebookUserInfo?.uid}/picture?width=200&height=200&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`}
                            />
                            <Title level={5}>
                                {appStore?.facebookUserInfo?.name}
                            </Title>
                        </div>
                    </Header>

                    <Content style={{ margin: '24px 16px 0' }}>
                        <div
                            className="site-layout-background"
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            <Routes>{routerList}</Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        FABI Toolkit by James Nguyen (jamesngdev)
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
});

export default DefaultLayout;
