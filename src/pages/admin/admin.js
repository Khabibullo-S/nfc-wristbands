import {useEffect, useState} from "react";
import "../../assets/css/adminDash.css";
import {Routes, Route, NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {$authHost, useTokenRefresh} from "../../http";
import {adminRoute, companyRoute, polyRoute, userRoute} from "../../routs";
import {
    PieChartOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    BgColorsOutlined
} from "@ant-design/icons";
import {
    EDIT_ALL_USER,
    GET_ORDERS,
    ORDER_USER,
    ORDERS_MANAGER,
    PROFILE_ADMIN,
    PROFILE_COMPANY,
    PROFILE_USER,
    STATISTIC, THEME_USER,
    USER_LIST,
} from "../../utils/consts";
import {logOut} from "../../http/userAPI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {
    faWallet,
    faArrowRightFromBracket,
    faPhone,
    faEnvelope,
    faBuilding,
    faUserTie,
    faMapLocationDot,
    faUsers,
    faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

const Admin = observer(() => {
    const [currentUser, setCurrentUser] = useState([]);
    const [User, setUser] = useState({});
    const [activeNav, setActiveNav] = useState("1");
    const handleNavBtnClick = (key) => {
        setActiveNav(key);
    };
    const token = useTokenRefresh();
    useEffect(() => {
        try {
            const getData = async () => {
                const res = await $authHost.get(
                    "api/v1/users/" + localStorage.getItem("uuid")
                );
                setCurrentUser([res.data]);
                setUser(res.data);
            };
            if (token) {
                getData();
            } else {
                return console.log("err");
            }
        } catch (e) {
            return window.location.assign("/");
        }
    }, [token]);
    const typeUser = () => {
        if (currentUser.length === 0) {
            return "";
        }

        return currentUser[0].type;
    };
    useEffect(() => {
        typeUser();
    }, []);

    return (
        <div
            className="admin__container"
            style={{
                gridTemplateColumns: `${
                    typeUser() === "POLYGRAPHY" ? "1fr" : "1fr 1fr"
                }`,
            }}
        >
            <div className="admin__info">
                <div className="sidebar-admin">
                    <div className="sidebar-content">
                        <div className="sidebar__profile">
                            <div>
                                {User.first_name ? User.first_name[0] : <p>Loading...</p>}
                            </div>
                        </div>
                        <div className="sidebar__navigation">
                            {typeUser() === "REGULAR" && (
                                <nav className="sidebar-navItem">
                                    <li>
                                        <NavLink to={PROFILE_USER}>
                                            <FontAwesomeIcon icon={faUser} size="lg"/>
                                            <p>Profile</p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={THEME_USER}>
                                            <BgColorsOutlined/>
                                            <p>Theme</p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={ORDER_USER}>
                                            <FontAwesomeIcon icon={faWallet} size="lg"/>
                                            <p>Orders </p>
                                        </NavLink>
                                    </li>
                                </nav>
                            )}
                            {typeUser() === "ADMIN" && (
                                <nav className="sidebar-navItem">
                                    <li>
                                        <NavLink to={PROFILE_ADMIN}>
                                            Profile <UserOutlined/>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={STATISTIC}>
                                            Statistic <PieChartOutlined/>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to={EDIT_ALL_USER}>
                                            Edit <UsergroupAddOutlined/>
                                        </NavLink>
                                    </li>
                                </nav>
                            )}
                            {typeUser() === "COMPANY" && (
                                <nav className="sidebar-navItem">
                                    <li>
                                        <NavLink to={`${PROFILE_COMPANY}`}>
                                            <FontAwesomeIcon icon={faWallet} size="lg"/>
                                            <p>Orders </p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={USER_LIST}>
                                            <FontAwesomeIcon icon={faUsers} size="lg"/>
                                            <p>Users list </p>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={ORDERS_MANAGER}>
                                            <FontAwesomeIcon icon={faMoneyCheckDollar} size="lg"/>
                                            <p>Manager's order</p>
                                        </NavLink>
                                    </li>
                                </nav>
                            )}
                            {typeUser() === "POLYGRAPHY" && (
                                <nav className="sidebar-navItem">
                                    <li>
                                        <NavLink to={GET_ORDERS}>
                                            <FontAwesomeIcon icon={faWallet} size="lg"/>
                                            <p>Orders </p>
                                        </NavLink>
                                    </li>
                                </nav>
                            )}
                        </div>
                    </div>
                    <div className="admin__logout">
                        <button className="admin__logout-button" onClick={logOut}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg"/>
                        </button>
                    </div>
                </div>
                <div className="admin__info-content">
                    <div className="content-admin-page">
                        <div>
                            <Routes>
                                {typeUser() === "REGULAR" &&
                                    userRoute.map(({path, Component}) => (
                                        <Route key={path} path={path} element={Component} exact/>
                                    ))}
                                {typeUser() === "ADMIN" &&
                                    adminRoute.map(({path, Component}) => (
                                        <Route key={path} path={path} element={Component} exact/>
                                    ))}
                                {typeUser() === "COMPANY" &&
                                    companyRoute.map(({path, Component}) => (
                                        <Route key={path} path={path} element={Component} exact/>
                                    ))}
                                {typeUser() === "POLYGRAPHY" &&
                                    polyRoute.map(({path, Component}) => (
                                        <Route key={path} path={path} element={Component} exact/>
                                    ))}
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
            {typeUser() !== "POLYGRAPHY" && (
                <div className="admin__card">
                    <div className="admin__blanc">
                        <div className="admin__card-photo">
                            <div className="admin__card-circle">
                                {/* <div className="rectangle"></div> */}
                                {User.first_name ? User.first_name[0] : <p>Loading...</p>}
                            </div>
                            <div className="admin__card-fullName">
                                {/* <input placeholder="Full name" type="text"/> */}
                                <div className="admin__card-names">
                                    {User.first_name ? (
                                        <div>
                                            {User.first_name} {User.last_name}
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="admin__card-about">
                            <div className="admin__contact-navbar">
                                <div
                                    onClick={() => handleNavBtnClick("1")}
                                    className={`${
                                        activeNav === "1" ? "active-nav" : ""
                                    } navbar-btn`}
                                >
                                    <span>Contact</span>
                                </div>
                                <div
                                    onClick={() => handleNavBtnClick("2")}
                                    className={`${
                                        activeNav === "2" ? "active-nav" : ""
                                    } navbar-btn`}
                                >
                                    <span>Company</span>
                                </div>
                                <div
                                    onClick={() => handleNavBtnClick("3")}
                                    className={`${
                                        activeNav === "3" ? "active-nav" : ""
                                    } navbar-btn`}
                                >
                                    <span>Address</span>
                                </div>
                            </div>
                        </div>
                        <div className="admin__card-info">
                            {activeNav === "1" && (
                                <div className="admin__card-contact card__about">
                                    <div className="card__info-phone card__inner-info">
                                        <FontAwesomeIcon icon={faPhone} size="lg"/>
                                        <div>
                                            <p>Mobile Phone</p>
                                            {User.phone ? User.phone : "add phone"}
                                            <div className="card__line"></div>
                                        </div>
                                    </div>
                                    <div className="card__info-email card__inner-info">
                                        <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                                        <div>
                                            <p>Email</p>
                                            {User.email ? User.email : "add email"}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeNav === "2" && (
                                <div className="admin__card-company card__about">
                                    <div className="card__info-organization card__inner-info">
                                        <FontAwesomeIcon icon={faBuilding} size="lg"/>
                                        <div>
                                            <p>Company</p>
                                            {User.work_info.org ? User.work_info.org : "add info"}
                                            <div className="card__line"></div>
                                        </div>
                                    </div>
                                    <div className="card__info-role card__inner-info">
                                        <FontAwesomeIcon icon={faUserTie} size="lg"/>
                                        <div>
                                            <p>Profession</p>
                                            {User.work_info.role ? User.work_info.role : "add info"}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeNav === "3" && (
                                <div className="admin__card-address card__about">
                                    <div className="card__info-adress card__inner-info">
                                        <FontAwesomeIcon icon={faMapLocationDot} size="lg"/>
                                        <div>
                                            <p>Address</p>
                                            {User.address !== null
                                                ? `${User.address.country} ${User.address.city} ${User.address.region} ${User.address.street}`
                                                : "add address"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Admin;
