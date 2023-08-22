import React, {useContext, useEffect, useState} from 'react';
import "../../assets/css/adminDash.css"
import {Routes, Route, Link} from "react-router-dom"
import {observer} from "mobx-react-lite";
import {$authHost, useTokenRefresh} from "../../http";
import {adminRoute, companyRoute, polyRoute, userRoute} from "../../routs";
import {
    AntDesignOutlined, DollarOutlined,
    MenuUnfoldOutlined, PieChartOutlined,
    QuestionCircleOutlined,
    UsergroupAddOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    ADMIN_ROUTE,
    EDIT_ALL_USER, GET_ORDERS,
    ORDER_USER, ORDERS_MANAGER,
    PROFILE_ADMIN,
    PROFILE_COMPANY,
    PROFILE_USER,
    STATISTIC, USER_LIST
} from "../../utils/consts";
import {getUser_Profile, logOut} from "../../http/userAPI";
import {Avatar, Layout, Space} from 'antd';
import {Container} from "react-bootstrap";
const { Header, Footer, Sider, Content } = Layout;

const Admin = observer(() => {
    const [currentUser, setCurrentUser] = useState([]);
    const [User, setUser] = useState({});
    const [isActive , setIsActive] = useState(false)
    const token = useTokenRefresh();
    useEffect(() => {
        try {
            const getData = async () => {
                const res = await $authHost.get('api/v1/users/' + localStorage.getItem('uuid'));
                setCurrentUser([res.data])
                setUser(res.data)
            };
            if (token) {
                getData()
            }else {return  console.log('err')}
        }catch (e) {
            return window.location.assign('/')
        }

    }, [token]);
    const typeUser = () => {
        if (currentUser.length === 0) {
            return "";
        }

        return currentUser[0].type;
    };
    useEffect(() => {
        typeUser()
    }, [])

    const showSidebar = ()=>{

        setIsActive(current => !current)
    }
    return (
        <>
            <div className="content-layout">
                <div className="header-admin">
                    <div className="header-icon-nav">
                       <button onClick={showSidebar}><MenuUnfoldOutlined /></button>
                    </div>
                    <div className="avatar">
                        <button onClick={logOut}>Logout</button>
                    </div>
                </div>
                <div className={isActive ? "sidebar-admin active" : "sidebar-admin"}>
                    <div className="profile-header">
                        <div className="profileIcon">{User.first_name && User.first_name[0]}{User.last_name && User.last_name[0]} </div>
                        <div className="profileName">{User.first_name && User.first_name}  {User.last_name && User.last_name} <br/> {User.username}</div>
                    </div>

                    <div className="sidebar-content">
                        {typeUser() === 'REGULAR' &&
                            <ul>
                                <li>
                                    <Link to={PROFILE_USER}>
                                        Profile <UserOutlined />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={ORDER_USER}>
                                        Order <DollarOutlined />
                                    </Link>
                                </li>
                            </ul>
                        }
                        {typeUser() === 'ADMIN' &&
                            (<ul>
                                <li>
                                    <Link to={PROFILE_ADMIN}>
                                        Profile <UserOutlined />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={STATISTIC}>
                                        Statistic <PieChartOutlined />
                                    </Link>
                                </li>

                                <li>
                                    <Link to={EDIT_ALL_USER}>
                                        Edit <UsergroupAddOutlined />
                                    </Link>
                                </li>
                            </ul>)}
                        {typeUser() === 'COMPANY' &&
                            <ul>
                                <li>
                                    <Link to={`${PROFILE_COMPANY}`}>
                                        Profile <UserOutlined />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={USER_LIST}>
                                        User list <UsergroupAddOutlined />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={ORDERS_MANAGER}>
                                        Order <DollarOutlined />
                                    </Link>
                                </li>

                            </ul>
                        }
                        {typeUser() === 'POLYGRAPHY' &&
                            <ul>
                                <li>
                                    <Link to={GET_ORDERS}>
                                        Order <DollarOutlined />
                                    </Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
                <div className="content-admin-page">
                    <Container>
                        <Routes>
                            {typeUser() === 'REGULAR' && userRoute.map(({path, Component}) =>
                                <Route key={path} path={path} element={Component} exact/>
                            )}
                            {typeUser() === 'ADMIN' && adminRoute.map(({path, Component}) =>
                                <Route key={path} path={path} element={Component} exact/>
                            )}
                            {typeUser() === 'COMPANY' && companyRoute.map(({path, Component}) =>
                                <Route key={path} path={path} element={Component} exact/>
                            )}
                            {typeUser() === 'POLYGRAPHY' && polyRoute.map(({path, Component}) =>
                                <Route key={path} path={path} element={Component} exact/>
                            )}
                        </Routes>
                    </Container>
                </div>
            </div>
        </>
    );
});

export default Admin;
