import { useEffect, useState } from "react";
import "../../assets/css/adminDash.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { $authHost, useTokenRefresh } from "../../http";
import { adminRoute, companyRoute, polyRoute, userRoute } from "../../routs";
import {
  PieChartOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  BgColorsOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

import {
  EDIT_ALL_USER,
  GET_ORDERS,
  ORDER_USER,
  ORDERS_MANAGER,
  PROFILE_ADMIN,
  PROFILE_COMPANY,
  PROFILE_USER,
  STATISTIC,
  THEME_COMPANY,
  THEME_USER,
  USER_LIST,
} from "../../utils/consts";
import { logOut } from "../../http/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
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
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { Button, message, Space } from "antd";
import ClipboardJS from "clipboard";
import logo from "../../assets/img/logo.png";
import bg from "../../assets/img/card-bg.png";

const Admin = observer(() => {
  // <<<<<<< HEAD
  const [currentUser, setCurrentUser] = useState([]);
  const [User, setUser] = useState({});
  const [activeNav, setActiveNav] = useState("1");
  const listTheme = [
    {
      theme: "whiteBlack",
      color1: "#fff",
      color2: "#000",
      textColor: "#000",
      textColor2: "#FFFFFF",
    },
    {
      theme: "greenBlack",
      color1: "#fff",
      color2: "#000",
      textColor: "#000",
      textColor2: "#FFFFFF",
    },
    {
      theme: "blackGreen",
      color1: "#fff",
      color2: "#7dba28",
      textColor: "#000",
      textColor2: "#FFFFFF",
    },
    {
      theme: "blackGold",
      color1: "#fff",
      color2: "#d4af37",
      textColor: "#000",
      textColor2: "#FFFFFF",
    },
    {
      theme: "blackPink",
      color1: "#fff",
      color2: "#d4a",
      textColor: "#000",
      textColor2: "#FFFFFF",
    },
  ];

  // photoImageUpload
  const [photoDataUrl, setPhotoDataUrl] = useState("");

  useEffect(() => {
    // Получите данные изображения из Local Storage
    const storedPhoto = localStorage.getItem("selectedPhoto");

    if (storedPhoto) {
      setPhotoDataUrl(storedPhoto);
    }
  }, []);

  useEffect(() => {
    const storedPhoto = localStorage.getItem("photo");
    if (storedPhoto) {
      setPhotoDataUrl(storedPhoto);
    }
  }, []);

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
  const CopytURLNotification = () => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
      const clipboard = new ClipboardJS(".copy-url-button");

      clipboard.on("success", () => {
        messageApi.success("URL успешно скопирован");
      });

      return () => {
        clipboard.destroy();
      };
    }, [messageApi]);
    return (
      <>
        {contextHolder}
        <Space>
          <Button
            className="copy-url-button"
            data-clipboard-text={`https://nfcglobaltech.uz/contact/${User.username}`}
          >
            Copy URL: contact/{User.first_name}
          </Button>
        </Space>
      </>
    );
  };

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
                      <FontAwesomeIcon icon={faUser} size="lg" />
                      <p>Profile</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={ORDER_USER}>
                      <FontAwesomeIcon icon={faWallet} size="lg" />
                      <p>Orders </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={THEME_USER}>
                      <FontAwesomeIcon icon={faPalette} size="lg" />
                      <p>Theme</p>
                    </NavLink>
                  </li>
                </nav>
              )}
              {typeUser() === "ADMIN" && (
                <nav className="sidebar-navItem">
                  <li>
                    <NavLink to={PROFILE_ADMIN}>
                      Profile <UserOutlined />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={STATISTIC}>
                      Statistic <PieChartOutlined />
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to={EDIT_ALL_USER}>
                      Edit <UsergroupAddOutlined />
                    </NavLink>
                  </li>
                </nav>
              )}
              {typeUser() === "COMPANY" && (
                <nav className="sidebar-navItem">
                  <li>
                    <NavLink to={`${PROFILE_COMPANY}`}>
                      <FontAwesomeIcon icon={faWallet} size="lg" />
                      <p>Orders </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={USER_LIST}>
                      <FontAwesomeIcon icon={faUsers} size="lg" />
                      <p>Users list </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={ORDERS_MANAGER}>
                      <FontAwesomeIcon icon={faMoneyCheckDollar} size="lg" />
                      <p>Manager's order</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={THEME_COMPANY}>
                      <FontAwesomeIcon icon={faPalette} size="lg" />
                      <p>Theme</p>
                    </NavLink>
                  </li>
                </nav>
              )}
              {typeUser() === "POLYGRAPHY" && (
                <nav className="sidebar-navItem">
                  <li>
                    <NavLink to={GET_ORDERS}>
                      <FontAwesomeIcon icon={faWallet} size="lg" />
                      <p>Orders </p>
                    </NavLink>
                  </li>
                </nav>
              )}
            </div>
          </div>
          <div className="admin__logout">
            <button className="admin__logout-button" onClick={logOut}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
            </button>
          </div>
        </div>
        <div className="admin__info-content">
          <div className="content-admin-page">
            <div>
              <Routes>
                {typeUser() === "REGULAR" &&
                  userRoute.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact />
                  ))}
                {typeUser() === "ADMIN" &&
                  adminRoute.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact />
                  ))}
                {typeUser() === "COMPANY" &&
                  companyRoute.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact />
                  ))}
                {typeUser() === "POLYGRAPHY" &&
                  polyRoute.map(({ path, Component }) => (
                    <Route key={path} path={path} element={Component} exact />
                  ))}
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <div className="admin__card-copyURL">{CopytURLNotification()}</div>
      {typeUser() !== "POLYGRAPHY" &&
        listTheme.map((item, index) => {
          const activeNavCss = {
            background: item.color2,
            color: item.textColor2,
          };
          if (item.theme === User.theme) {
            return (
              <div className="admin__card admin_card-person" key={index}>
                <div
                  className="admin__blanc"
                  style={{ background: item.color1, color: item.textColor }}
                >
                  <div style={{ height: "40%", paddingBottom: 15 }}>
                    <div className="admin__blanc-header">
                      <img src={logo} alt="logo" />
                    </div>
                    <div className="admin__card-photo">
                      <div className="admin__card-circle">
                        {User.image ? (
                          <img src={User.image} alt="Selected" />
                        ) : (
                          <span>
                            {User.first_name ? User.first_name[0] : "B"}
                          </span>
                        )}
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
                  </div>
                  <div style={{ height: "100%", marginTop: 10 }}>
                    <div className="admin__card-about">
                      <div className="admin__contact-navbar">
                        <div
                          onClick={() => handleNavBtnClick("1")}
                          style={
                            activeNav === "1"
                              ? activeNavCss
                              : { background: "transparent" }
                          }
                          className={`${
                            activeNav === "1" ? "active-nav" : ""
                          } navbar-btn`}
                        >
                          <span>Contact</span>
                        </div>
                        <div
                          onClick={() => handleNavBtnClick("2")}
                          style={
                            activeNav === "2"
                              ? activeNavCss
                              : { background: "transparent" }
                          }
                          className={`${
                            activeNav === "2" ? "active-nav" : ""
                          } navbar-btn`}
                        >
                          <span>Company</span>
                        </div>
                        <div
                          onClick={() => handleNavBtnClick("3")}
                          style={
                            activeNav === "3"
                              ? activeNavCss
                              : { background: "transparent" }
                          }
                          className={`${
                            activeNav === "3" ? "active-nav" : ""
                          } navbar-btn`}
                        >
                          <span>Address</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="admin__card-info"
                      style={{
                        background: item.color2,
                        color: item.textColor2,
                      }}
                    >
                      <img
                        className="admin__card-info-img"
                        src={bg}
                        alt="bg-logo"
                      />
                      {activeNav === "1" && (
                        <div className="admin__card-contact card__about">
                          <div className="card__info-phone card__inner-info">
                            <FontAwesomeIcon icon={faPhone} size="lg" />
                            <div>
                              <p>Mobile Phone</p>
                              {User.phone ? User.phone : "add phone"}
                              <div className="card__line"></div>
                            </div>
                          </div>
                          <div className="card__info-email card__inner-info">
                            <FontAwesomeIcon icon={faEnvelope} size="lg" />
                            <div>
                              <p>Email</p>
                              {User.email ? User.email : "add email"}
                            </div>
                          </div>
                          <div className="card__info-email card__inner-info">
                            <LinkedinOutlined />
                            <div>
                              <p>LinkedIn</p>
                              {User.linkedin ? User.linkedin : "add linkedIn"}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeNav === "2" && (
                        <div className="admin__card-company card__about">
                          <div className="card__info-organization card__inner-info">
                            <FontAwesomeIcon icon={faBuilding} size="lg" />
                            <div>
                              <p>Company</p>
                              {User.work_info.org
                                ? User.work_info.org
                                : "add info"}
                              <div className="card__line"></div>
                            </div>
                          </div>
                          <div className="card__info-role card__inner-info">
                            <FontAwesomeIcon icon={faUserTie} size="lg" />
                            <div>
                              <p>Profession</p>
                              {User.work_info.role
                                ? User.work_info.role
                                : "add info"}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeNav === "3" && (
                        <div className="admin__card-address card__about">
                          <div className="card__info-adress card__inner-info">
                            <FontAwesomeIcon
                              icon={faMapLocationDot}
                              size="lg"
                            />
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
              </div>
            );
          } else {
          }
        })}
    </div>
  );
});

export default Admin;
