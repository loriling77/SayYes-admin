import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { BrowserRouter, Route, Routes, useLocation, Link, Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu } from 'antd';
import routes from "../route/index";

const { Sider, Content, Header } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

// 图标映射表
const iconMap: Record<string, React.ReactNode> = {
    '/dashboard': <PieChartOutlined />,
    '/invitations': <ContainerOutlined />,
    '/categories': <AppstoreOutlined />,
    '/settings': <DesktopOutlined />,
    '/user': <UserOutlined />,
    '/messages': <MailOutlined />
};

// 生成菜单
const generateMenuItems = (): MenuItem[] => {
    return routes
        .filter(route => route.path !== '/' && route.path !== '/login')
        .map((route) => ({
            key: route.path,
            icon: iconMap[route.path] || <PieChartOutlined />,
            label: <Link to={route.path}>{route.name}</Link>,
            ...(route.children ? {
                children: route.children.map((child) => ({
                    key: `${route.path}-${child.path}`,
                    label: <Link to={`${route.path}/${child.path}`}>{child.name}</Link>
                }))
            } : {})
        }));
};

// 定义RouteContainer接收的props类型
interface RouteContainerProps {
    collapsed: boolean;
    toggleCollapsed: () => void;
}

// 路由容器组件 - 接收collapsed和toggleCollapsed作为props
const RouteContainer: React.FC<RouteContainerProps> = ({ collapsed, toggleCollapsed }) => {
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState(location.pathname);

    // 监听路由变化，更新选中菜单
    useEffect(() => {
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    const menuItems = generateMenuItems();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 侧边栏 */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                collapsedWidth={80}
                width={256}
                theme="dark"
                style={{ transition: 'width 0.2s' }}
            >
                <div style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
                    后台管理系统
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    style={{ height: 'calc(100% - 64px)', borderRight: 0, marginTop: 20 }}
                />
            </Sider>

            {/* 主内容区 */}
            <Layout>
                {/* 顶部导航 */}
                <Header style={{ padding: '0 24px', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={toggleCollapsed}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />
                </Header>

                {/* 页面内容 */}
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: 'white' }}>
                    <Routes>
                        {routes.map((item) => (
                            <Route
                                key={item.path}
                                path={item.path}
                                element={item.children ?
                                    <>
                                        {item.element}
                                        <Outlet></Outlet>
                                    </> :
                                    item.element

                                }
                            >
                                {item.children?.map((child) => (
                                    <Route
                                        key={child.path}
                                        path={child.path}
                                        element={child.element}
                                    />


                                ))}
                            </Route>

                        ))}
                    </Routes>

                </Content>
            </Layout>
        </Layout>
    );
};

const App: React.FC = () => {
    // 在这里定义collapsed状态
    const [collapsed, setCollapsed] = useState(false);

    // 在这里定义toggleCollapsed方法
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    // 通过props将collapsed和toggleCollapsed传递给RouteContainer
    return (
        <BrowserRouter>
            <RouteContainer
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
            />
        </BrowserRouter>
    );
};

export default App;
