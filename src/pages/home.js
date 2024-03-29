import React, {
  useState,
  useEffect,
  useRef,
  useHistory,
  useMessage,
} from "react";
import Select from "react-select";
import Carousel from "react-bootstrap/Carousel";
import "../assets/css/home.css";
import Question from "../component/question";
import Wpsay from "../component/wpsay";
import VideoPanel from "../component/videoPanel";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, USER_CONTACT } from "../utils/consts";
import { Link } from "react-router-dom";
import { message } from "antd";
import { faqLangs, newHomeLangs } from "../utils/multiLang";
import Faq from "../component/faq";
import WOW from "wow.js/dist/wow.js";
import "animate.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Registration from "./registration";

//review slider settings
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const customComponents = {
  DropdownIndicator: () => null,
  IndicatorSeparator: () => null,
};
const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    borderRadius: "10px",
    backgroundColor: "var(--second-color)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    fontSize: "1rem",
    textAlign: "center",
    outline: "none !important",
    cursor: "pointer",
    boxShadow: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: state.isSelected
      ? "#7755cc"
      : state.isFocused
      ? "#f3f3f3"
      : "white",
    color: state.isSelected ? "white" : "black",
    textAlign: "center",
  }),
  menuList: (provided) => ({
    ...provided,
    borderRadius: "10px",
    paddingTop: 0,
    paddingBottom: 0,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
  }),
};
// <- for language select

const slides = (
  <>
    <div className="slide">
      <img src={require("../assets/testImg/partner1.png")} alt="" />
    </div>
    <div className="slide">
      <img src={require("../assets/testImg/partner2.png")} alt="" />
    </div>
    <div className="slide">
      <img src={require("../assets/testImg/partner3.png")} alt="" />
    </div>
    <div className="slide">
      <img src={require("../assets/testImg/partner4.png")} alt="" />
    </div>
    <div className="slide">
      <img src={require("../assets/testImg/partner5.png")} alt="" />
    </div>
  </>
);

const footerLinks = [
  [
    {
      lang: newHomeLangs.footerSection.footerColumns[0].columnLinks[0], //features
      scroll: "#features",
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[0].columnLinks[1], //pricing
      scroll: "#pricing",
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[0].columnLinks[2], //reviews
      scroll: "#reviews",
    },
  ],
  [
    {
      lang: newHomeLangs.footerSection.footerColumns[1].columnLinks[0], //about
      link: "/about",
      soon: true,
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[1].columnLinks[1], //contact
      link: "/contact",
      soon: true,
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[1].columnLinks[2], //support
      link: "/support",
      soon: true,
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[1].columnLinks[3], //news
      link: "/news",
      soon: true,
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[1].columnLinks[4], //careers
      link: "/careers",
      soon: true,
    },
  ],
  [
    {
      lang: newHomeLangs.footerSection.footerColumns[2].columnLinks[0], //privacy policy
      link: "/legal",
      soon: true,
    },
    {
      lang: newHomeLangs.footerSection.footerColumns[2].columnLinks[1], //terms of service
      link: "/legal",
      soon: true,
    },
  ],
];

const Home = () => {
  /* for nav menu toggler */
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const languageSelectorRef = useRef(null);
  const [pageLang, setPageLang] = useState(
    localStorage.getItem("language") || "uz"
  );
  const [openLanguageSelector, setOpenLanguageSelector] = useState(false);
  const [yournameInput, setYournameInput] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // Create a ref for the input element
  const inputRef = useRef();

  // Create a function to handle clicks on the div
  const handleInputBtnClick = () => {
    // Set the focus on the input element
    inputRef.current.focus();
  };

  const handleYournameChange = (event) => {
    setYournameInput(event.target.value);
  };
  const sendNameInput = () => {
    if (yournameInput === "" || !yournameInput) {
      messageApi.open({
        type: "error",
        content: "username is required",
      });
    } else {
      localStorage.setItem("name", yournameInput);
      window.location.assign("/registration");
    }
  };

  useEffect(() => {
    // save pageLang to localStorage under "language" key
    localStorage.setItem("language", pageLang);
    console.log(localStorage.getItem("language"));
  }, [pageLang]); // only run when pageLang changes

  const handleBurgerClick = (event) => {
    // Stop the propagation of the click event to prevent conflicts
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.style.maxHeight = showMenu
        ? // ? `${menuRef.current.scrollHeight}px`
          "500px"
        : // "320px"
          "0";
    }
    // Add a click event listener to the document
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    if (languageSelectorRef.current) {
      if (openLanguageSelector) {
        languageSelectorRef.current.classList.add("open");
        // languageSelectorRef.current.classList.remove("collapsed");
      } else {
        // languageSelectorRef.current.classList.add("collapsed");
        languageSelectorRef.current.classList.remove("open");
      }
    }
  }, [openLanguageSelector]);

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  /* for price switch */
  const [priceTime, setPriceTime] = useState("monthly"); // can be "monthly", "yearly", "lifetime"

  // toggle tutorial video section
  const [showTutorial, setShowTutorial] = useState(false);
  const handleTutorialToggle = (event) => {
    // Stop the propagation of the click event to prevent conflicts
    // event.stopPropagation();
    setShowTutorial(!showTutorial);
  };
  useEffect(() => {
    document.body.classList.toggle("no-scroll", showTutorial);
  }, [showTutorial]);

  return (
    <>
      {contextHolder}
      {showTutorial ? (
        <div className="Home-tutorial-section" onClick={handleTutorialToggle}>
          <iframe
            className="tutorial-iframe"
            src="https://www.youtube.com/embed/XavmjZs7co4?si=7mHs6tgN7mpFArXn"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      ) : (
        <></>
      )}
      <div className="Home">
        <div className="Home-container">
          {/* NAVBAR */}
          <div className="home-navbar wow animate__animated animate__slideInDown">
            <div className="navbar-box">
              <div className="navbar-left">
                <div className="logo">
                  <a href="/">
                    <img
                      src={require("../assets/testImg/nfc-logo.png")}
                      alt=""
                    />
                  </a>
                </div>
                <div className="navbar-left-btns">
                  {/* LANGUAGES */}
                  <Select
                    className="select first-select"
                    components={customComponents}
                    value={{
                      value: pageLang,
                      label:
                        pageLang.charAt(0).toUpperCase() + pageLang.slice(1),
                    }}
                    onChange={(selectedOption) =>
                      setPageLang(selectedOption.value)
                    }
                    styles={customStyles}
                    closeMenuOnSelect={true}
                    options={[
                      { value: "uz", label: "Uz" },
                      { value: "ru", label: "Ru" },
                      { value: "en", label: "En" },
                    ]}
                  />
                  <div
                    className="burger-menu"
                    onClick={(event) => handleBurgerClick(event)}
                  >
                    <div className="nav-toggle">
                      <span
                        className={`bar ${showMenu ? "x-icon" : ""}`}
                      ></span>
                      <span
                        className={`bar ${showMenu ? "x-icon" : ""}`}
                      ></span>
                      <span
                        className={`bar ${showMenu ? "x-icon" : ""}`}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={menuRef}
                // className={`navbar-right ${
                //   showMenu ? "wow animate__animated animate__slideInDown" : ""
                // }`}
                className="navbar-right"
              >
                <div className="navbar-links">
                  <div className="navbar-link">
                    <Link to="/">{newHomeLangs.navbar.home[pageLang]}</Link>
                  </div>
                  <div className="navbar-link">
                    <Link to="/">{newHomeLangs.navbar.about[pageLang]}</Link>
                  </div>
                  <div className="navbar-link">
                    <Link to="/">{newHomeLangs.navbar.contact[pageLang]}</Link>
                  </div>
                </div>
                <div className="navbar-btns">
                  {/* LANGUAGES */}
                  <Select
                    className="select second-select"
                    components={customComponents}
                    value={{
                      value: pageLang,
                      label:
                        pageLang.charAt(0).toUpperCase() + pageLang.slice(1),
                    }}
                    onChange={(selectedOption) =>
                      setPageLang(selectedOption.value)
                    }
                    styles={customStyles}
                    closeMenuOnSelect={true}
                    options={[
                      { value: "uz", label: "Uz" },
                      { value: "ru", label: "Ru" },
                      { value: "en", label: "En" },
                    ]}
                  />
                  <Link className="login-btn first-btn-style" to={LOGIN_ROUTE}>
                    {newHomeLangs.navbar.login[pageLang]}
                  </Link>
                  <Link
                    className="signup-btn second-btn-style"
                    to={REGISTRATION_ROUTE}
                  >
                    {newHomeLangs.navbar.signUp[pageLang]}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* HERO SECTION */}
          <div className="hero-section">
            <div className="hero-box wow animate__animated animate__slideInUp">
              <div className="hero-left">
                <div className="hero-info">
                  <div
                    className="info-title"
                    dangerouslySetInnerHTML={{
                      __html: newHomeLangs.heroSection.infoTitle[pageLang],
                    }}
                  ></div>
                  <div className="info-text">
                    <div className="third-color-font">
                      {newHomeLangs.heroSection.infoText[pageLang]}
                    </div>
                  </div>
                </div>
                <div className="hero-btns">
                  <Link
                    to={REGISTRATION_ROUTE}
                    className="download-btn second-btn-style"
                  >
                    {newHomeLangs.heroSection.getStarted[pageLang]}
                  </Link>
                  <div
                    className="demo-btn first-btn-style"
                    onClick={handleTutorialToggle}
                  >
                    {newHomeLangs.heroSection.watchVideo[pageLang]}
                  </div>
                </div>
              </div>
              <div className="hero-right">
                <div className="big-card-img-container border-r-64px">
                  <img src={require("../assets/testImg/gif1.gif")} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* SLIDER SECTION */}
          <div className="home-slider-section">
            <div className="section-header  wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.trustedBySection.headerTitle[pageLang],
                }}
              ></div>
            </div>
            <div className="home-slider wow animate__animated animate__slideInLeft">
              <div className="slider-box">
                <div className="slider-track">
                  {slides}
                  {slides}
                  {slides}
                  {slides}
                </div>
              </div>
            </div>
          </div>

          {/* FUNCTIONS SECTION */}
          <div className="functions-section">
            <div className="section-header  wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.functionsSection.headerTitle[pageLang],
                }}
              >
                {/* <div>Mobile Money Management </div>
              <div>
                <span className="second-color-font underlined-text">
                  Reimagined
                </span>{" "}
                for the Better
              </div> */}
              </div>
              <div className="section-header-text">
                <div className="third-color-font">
                  {newHomeLangs.functionsSection.headerText[pageLang]}
                </div>
              </div>
            </div>
            <div className="functions-cards">
              <div className="functions-card  wow animate__animated animate__slideInLeft">
                <div className="functions-card-icon-container">
                  <div className="functions-card-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke='var(--token-057e105f-6de4-415f-b0f5-ac7d77f8a158, rgb(255, 255, 255)) /* {"name":"White"} */'
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", cursor: "auto", height: "100%" }}
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                </div>
                <div className="functions-card-bottom">
                  <div className="functions-card-info">
                    <div className="functions-card-info-title">
                      {
                        newHomeLangs.functionsSection.cards[0].infoTitle[
                          pageLang
                        ]
                      }
                    </div>
                    <div className="functions-card-info-text">
                      {
                        newHomeLangs.functionsSection.cards[0].infoText[
                          pageLang
                        ]
                      }
                    </div>
                  </div>
                  {/* <div className="functions-card-learn-container">
                  <div>Learn More</div>
                  <div>{">"}</div>
                </div> */}
                </div>
              </div>
              <div className="functions-card  wow animate__animated animate__slideInLeft">
                <div className="functions-card-icon-container">
                  <div className="functions-card-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke='var(--token-057e105f-6de4-415f-b0f5-ac7d77f8a158, rgb(255, 255, 255)) /* {"name":"White"} */'
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", cursor: "auto", height: "100%" }}
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                </div>
                <div className="functions-card-bottom">
                  <div className="functions-card-info">
                    <div className="functions-card-info-title">
                      {
                        newHomeLangs.functionsSection.cards[1].infoTitle[
                          pageLang
                        ]
                      }
                    </div>
                    <div className="functions-card-info-text">
                      {
                        newHomeLangs.functionsSection.cards[1].infoText[
                          pageLang
                        ]
                      }
                    </div>
                  </div>
                  {/* <div className="functions-card-learn-container">
                  <div>Learn More</div>
                  <div>{">"}</div>
                </div> */}
                </div>
              </div>
              <div className="functions-card  wow animate__animated animate__slideInLeft">
                <div className="functions-card-icon-container">
                  <div className="functions-card-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke='var(--token-057e105f-6de4-415f-b0f5-ac7d77f8a158, rgb(255, 255, 255)) /* {"name":"White"} */'
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", cursor: "auto", height: "100%" }}
                    >
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                    </svg>
                  </div>
                </div>
                <div className="functions-card-bottom">
                  <div className="functions-card-info">
                    <div className="functions-card-info-title">
                      {
                        newHomeLangs.functionsSection.cards[2].infoTitle[
                          pageLang
                        ]
                      }
                    </div>
                    <div className="functions-card-info-text">
                      {
                        newHomeLangs.functionsSection.cards[2].infoText[
                          pageLang
                        ]
                      }
                    </div>
                  </div>
                  {/* <div className="functions-card-learn-container">
                  <div>Learn More</div>
                  <div>{">"}</div>
                </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* FEATURES SECTION */}
          <div className="features-section" id="features">
            <div className="section-header   wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.featuresSection.headerTitle[pageLang],
                }}
              ></div>
              <div className="section-header-text">
                <div className="third-color-font">
                  {newHomeLangs.featuresSection.headerText[pageLang]}
                </div>
              </div>
            </div>
            <div className="features-cards">
              <div className="big-card main-color-bg  wow animate__animated animate__slideInLeft">
                <div className="big-card-left">
                  <div className="big-card-img-container border-r-64px">
                    <img src={require("../assets/testImg/gif2.gif")} alt="" />
                  </div>
                </div>
                <div className="big-card-right">
                  <div
                    className="big-card-info-title"
                    dangerouslySetInnerHTML={{
                      __html:
                        newHomeLangs.featuresSection.cards[0].infoTitle[
                          pageLang
                        ],
                    }}
                  ></div>
                  <div className="big-card-info-text">
                    <div className="third-color-font">
                      {newHomeLangs.featuresSection.cards[0].infoText[pageLang]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="big-card sc-theme-main-color-bg  wow animate__animated animate__slideInLeft">
                <div className="big-card-left">
                  <div className="big-card-img-container border-r-64px">
                    <img src={require("../assets/testImg/gif3.gif")} alt="" />
                  </div>
                </div>
                <div className="big-card-right">
                  <div
                    className="big-card-info-title"
                    dangerouslySetInnerHTML={{
                      __html:
                        newHomeLangs.featuresSection.cards[1].infoTitle[
                          pageLang
                        ],
                    }}
                  ></div>
                  <div className="big-card-info-text">
                    <div className="third-color-font">
                      {newHomeLangs.featuresSection.cards[1].infoText[pageLang]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="big-card trd-theme-main-color-bg  wow animate__animated animate__slideInLeft">
                <div className="big-card-left">
                  <div className="big-card-img-container border-r-64px">
                    <img
                      src={require("../assets/testImg/wristbandTypes.jpg")}
                      alt=""
                    />
                  </div>
                </div>
                <div className="big-card-right">
                  <div
                    className="big-card-info-title"
                    dangerouslySetInnerHTML={{
                      __html:
                        newHomeLangs.featuresSection.cards[2].infoTitle[
                          pageLang
                        ],
                    }}
                  ></div>
                  <div className="big-card-info-text">
                    <div className="third-color-font">
                      {newHomeLangs.featuresSection.cards[2].infoText[pageLang]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD SECTION */}
          <div className="dashboard-section">
            <div className="section-header  wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.dashboardSection.headerTitle[pageLang],
                }}
              ></div>
              <div className="section-header-text">
                <div className="third-color-font">
                  {newHomeLangs.dashboardSection.headerText[pageLang]}
                </div>
              </div>
            </div>
            <div className="big-card main-color-bg border-r-64px  wow animate__animated animate__slideInUp">
              <div className="big-card-left">
                {/* <div className="big-card-icon-container">
                <div className="big-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "100%", cursor: "auto", height: "100%" }}
                  >
                    <polyline points="17 1 21 5 17 9"></polyline>
                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                    <polyline points="7 23 3 19 7 15"></polyline>
                    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                  </svg>
                </div>
              </div> */}
                <div className="big-card-info">
                  <div className="big-card-info-top">
                    <div
                      className="big-card-info-title"
                      dangerouslySetInnerHTML={{
                        __html:
                          newHomeLangs.dashboardSection.infoTitle[pageLang],
                      }}
                    ></div>
                    <div className="big-card-info-text">
                      <div className="third-color-font">
                        {newHomeLangs.dashboardSection.infoText[pageLang]}
                      </div>
                    </div>
                  </div>
                  {/* <div className="big-card-learn-container second-color-font">
                  <div>Learn More</div>
                  <div>{">"}</div>
                </div> */}
                  <div className="hero-btns">
                    <div
                      onClick={handleInputBtnClick}
                      className="input-btn first-btn-style"
                    >
                      <span class="unit">nfcglobaltech.uz/</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={yournameInput}
                        name=""
                        placeholder={
                          newHomeLangs.dashboardSection.inputBtnPlaceholder[
                            pageLang
                          ]
                        }
                        onChange={handleYournameChange}
                      />
                    </div>
                    <div
                      onClick={sendNameInput}
                      className="demo-btn second-btn-style"
                    >
                      {newHomeLangs.dashboardSection.claimBtn[pageLang]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="big-card-right">
                <div className="big-card-img-container second-color-bg border-r-64px">
                  <img src={require("../assets/img/wristband.png")} alt="" />
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="reviews-section" id="reviews">
            <div className="section-header  wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.reviewsSection.headerTitle[pageLang],
                }}
              ></div>
              <div className="section-header-text">
                <div className="third-color-font">
                  {newHomeLangs.reviewsSection.headerText[pageLang]}
                </div>
              </div>
            </div>
            <div className="reviews">
              <Slider {...settings}>
                {newHomeLangs.reviewsSection.reviews.map((review, index) => (
                  <div className="review main-color-bg  wow animate__animated animate__slideInLeft">
                    <div className="review-logo">
                      <img
                        src={require(`../assets/testImg/partnyor${
                          index + 1
                        }.png`)}
                        alt=""
                      />
                    </div>
                    <div className="review-text">{review.text[pageLang]}</div>
                    <div className="review-author">
                      <div className="review-author-img second-color-bg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 8 8"
                          id="person"
                          fill="#fff"
                          style={{
                            width: "100%",
                            cursor: "auto",
                            height: "100%",
                          }}
                        >
                          <path d="M4 0C2.9 0 2 1.12 2 2.5S2.9 5 4 5s2-1.12 2-2.5S5.1 0 4 0zM1.91 5C.85 5.05 0 5.92 0 7v1h8V7c0-1.08-.84-1.95-1.91-2-.54.61-1.28 1-2.09 1-.81 0-1.55-.39-2.09-1z"></path>
                        </svg>
                      </div>
                      <div className="review-author-info">
                        <div className="review-author-name">
                          {review.author[pageLang]}
                        </div>
                        <div className="review-author-title third-color-font">
                          {review.title[pageLang]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* PRICING SECTION */}
          <div className="pricing-section" id="pricing">
            <div className="section-header  wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.pricingSection.headerTitle[pageLang],
                }}
              ></div>
              <div className="section-header-text">
                <div className="third-color-font">
                  {newHomeLangs.pricingSection.headerText[pageLang]}
                </div>
              </div>
            </div>
            <div className="pricing-content">
              <div className="pricing-switch main-color-bg">
                <div
                  className={`pricing-switch-btn ${
                    priceTime === "monthly" ? "active" : ""
                  }`}
                  onClick={() => setPriceTime("monthly")}
                >
                  {newHomeLangs.pricingSection.pricingSwitch.monthly[pageLang]}
                </div>
                <div
                  className={`pricing-switch-btn ${
                    priceTime === "yearly" ? "active" : ""
                  }`}
                  onClick={() => setPriceTime("yearly")}
                >
                  {newHomeLangs.pricingSection.pricingSwitch.yearly[pageLang]}
                </div>
                {/* <div
                  className={`pricing-switch-btn ${
                    priceTime === "lifetime" ? "active" : ""
                  }`}
                  onClick={() => setPriceTime("lifetime")}
                >
                  {newHomeLangs.pricingSection.pricingSwitch.lifetime[pageLang]}
                </div> */}
              </div>
              <div className="pricing-plans">
                <div className="pricing-plan  wow animate__animated animate__slideInLeft">
                  <div className="pricing-plan-price">
                    <div className="price-title second-color-font">
                      {newHomeLangs.pricingSection.pricingTitle.free[pageLang]}
                    </div>
                    <div className="price-info">
                      <span className="price-number">$0 </span>
                      <span className="price-per-time third-color-font">
                        /{" "}
                        {priceTime === "monthly" ? (
                          <>
                            {
                              newHomeLangs.pricingSection.pricingTime.month[
                                pageLang
                              ]
                            }
                          </>
                        ) : priceTime === "yearly" ? (
                          <>
                            {
                              newHomeLangs.pricingSection.pricingTime.year[
                                pageLang
                              ]
                            }
                          </>
                        ) : (
                          <>
                            {
                              newHomeLangs.pricingSection.pricingTime.lifetime[
                                pageLang
                              ]
                            }
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="pricing-features">
                    {newHomeLangs.pricingSection.features.free.map(
                      (feature) => (
                        <div className="pricing-feature">
                          <div className="pricing-feature-icon-container">
                            <div className="pricing-feature-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke='var(--token-28245a58-6cde-4717-bfdd-03eb721e66b9, rgb(35, 17, 35)) /* {"name":"Text / Dark / Primary"} */'
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  width: "100%",
                                  cursor: "auto",
                                  height: "100%",
                                }}
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </div>
                          </div>
                          <div className="pricing-feature-info">
                            {feature[pageLang]}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <Link
                    to={REGISTRATION_ROUTE}
                    className="pricing-start-btn first-btn-style"
                  >
                    {newHomeLangs.pricingSection.pricingBtns.free[pageLang]}
                  </Link>
                </div>
                <div className="pricing-plan  wow animate__animated animate__slideInLeft">
                  <div className="pricing-plan-price">
                    <div className="price-title second-color-font">
                      {
                        newHomeLangs.pricingSection.pricingTitle.premium[
                          pageLang
                        ]
                      }
                    </div>
                    <div className="price-info">
                      <span className="price-number">
                        {priceTime === "monthly" ? (
                          <>$4.99</>
                        ) : priceTime === "monthly" ? (
                          <>$39.99</>
                        ) : (
                          <>$74.99</>
                        )}{" "}
                      </span>
                      <span className="price-per-time third-color-font">
                        /{" "}
                        {priceTime === "monthly" ? (
                          <>
                            {
                              newHomeLangs.pricingSection.pricingTime.month[
                                pageLang
                              ]
                            }
                          </>
                        ) : priceTime === "yearly" ? (
                          <>
                            {
                              newHomeLangs.pricingSection.pricingTime.year[
                                pageLang
                              ]
                            }
                          </>
                        ) : (
                          <>
                            {
                              newHomeLangs.pricingSection.pricingTime.lifetime[
                                pageLang
                              ]
                            }
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="pricing-features">
                    {newHomeLangs.pricingSection.features.premium.map(
                      (feature) => (
                        <div className="pricing-feature">
                          <div className="pricing-feature-icon-container">
                            <div className="pricing-feature-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke='var(--token-28245a58-6cde-4717-bfdd-03eb721e66b9, rgb(35, 17, 35)) /* {"name":"Text / Dark / Primary"} */'
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  width: "100%",
                                  cursor: "auto",
                                  height: "100%",
                                }}
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </div>
                          </div>
                          <div className="pricing-feature-info">
                            {feature[pageLang]}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <Link
                    to={REGISTRATION_ROUTE}
                    className="pricing-start-btn second-btn-style"
                  >
                    {newHomeLangs.pricingSection.pricingBtns.premium[pageLang]}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <div className="faq-section">
            <div className="section-header  wow animate__animated animate__slideInUp">
              <div
                className="section-header-title"
                dangerouslySetInnerHTML={{
                  __html: newHomeLangs.faqsSection.headerTitle[pageLang],
                }}
              ></div>
              <div className="section-header-text">
                <div className="third-color-font">
                  {newHomeLangs.faqsSection.headerText[pageLang]}
                </div>
              </div>
            </div>
            <div className="faqs">
              {faqLangs.faqs[pageLang].map((faq, index) => (
                <Faq
                  faq={faq}
                  key={index}
                  className="wow animate__animated animate__slideInUp"
                />
              ))}
            </div>
          </div>

          {/* GET STARTED SECTION */}
          <div className="start-section">
            <div className="start-box main-color-bg border-r-64px  wow animate__animated animate__slideInUp">
              <div className="section-header">
                <div
                  className="section-header-title"
                  dangerouslySetInnerHTML={{
                    __html:
                      newHomeLangs.getStartedSection.headerTitle[pageLang],
                  }}
                ></div>
                <div className="section-header-text">
                  <div className="third-color-font">
                    {newHomeLangs.getStartedSection.headerText[pageLang]}
                  </div>
                </div>
              </div>
              <div className="start-btns">
                <Link to={LOGIN_ROUTE} className="start-btn second-btn-style">
                  {
                    newHomeLangs.getStartedSection.getStartedBtns.download[
                      pageLang
                    ]
                  }
                </Link>
                <Link
                  to={REGISTRATION_ROUTE}
                  className="start-btn first-btn-style"
                >
                  {newHomeLangs.getStartedSection.getStartedBtns.demo[pageLang]}
                </Link>
              </div>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="footer-section  wow animate__animated animate__slideInUp">
            <div className="footer-box main-color-bg border-r-64px">
              <div className="footer-left">
                <div className="footer-super">
                  <div className="logo">
                    <a href="/">
                      <img
                        src={require("../assets/testImg/nfc-logo.png")}
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="rights-reserved third-color-font">
                    © 2023 NFCGLOBALTECH.{" "}
                    {newHomeLangs.footerSection.footerRights[pageLang]}
                  </div>
                </div>
                <div className="footer-socials">
                  <div className="footer-social">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke='var(--token-3d9f3466-3a04-4832-8618-d0889335958f, rgb(69, 33, 69)) /* {"name":"Text / Dark / Secondary"} */'
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", cursor: "auto", height: "100%" }}
                    >
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </div>
                  <div className="footer-social">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke='var(--token-3d9f3466-3a04-4832-8618-d0889335958f, rgb(69, 33, 69)) /* {"name":"Text / Dark / Secondary"} */'
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", cursor: "auto", height: "100%" }}
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div className="footer-social">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke='var(--token-3d9f3466-3a04-4832-8618-d0889335958f, rgb(69, 33, 69)) /* {"name":"Text / Dark / Secondary"} */'
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", cursor: "auto", height: "100%" }}
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="footer-right">
                {newHomeLangs.footerSection.footerColumns.map(
                  (column, index) => (
                    <div className="footer-column">
                      <div className="footer-column-header">
                        {column.columnTitle[pageLang]}
                      </div>
                      <div className="footer-column-links">
                        {footerLinks[index].map((link) => (
                          <div
                            className={`footer-column-link ${
                              link.soon ? "link-soon" : ""
                            }`}
                          >
                            {link.scroll ? (
                              <a href={link.scroll}>{link.lang[pageLang]}</a>
                            ) : (
                              <>
                                {/* <Link to={link.link}>
                                  {link.lang[pageLang]}
                                </Link> */}
                                <div className="linktxt-soon">
                                  {link.lang[pageLang]}
                                </div>
                                <div className="link-soontxt">
                                  {
                                    newHomeLangs.footerSection.soonText[
                                      pageLang
                                    ]
                                  }
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
                {/* <div className="footer-column">
                <div className="footer-column-header">
                  {
                    newHomeLangs.footerSection.footerColumns[0].columnTitle[
                      pageLang
                    ]
                  }
                </div>
                <div className="footer-column-links">
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[0][pageLang]
                    }
                  </div>
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[1][pageLang]
                    }
                  </div>
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[2][pageLang]
                    }
                  </div>
                </div>
              </div>
              <div className="footer-column">
                <div className="footer-column-header">
                  {
                    newHomeLangs.footerSection.footerColumns[1].columnTitle[
                      pageLang
                    ]
                  }
                </div>
                <div className="footer-column-links">
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[0][pageLang]
                    }
                  </div>
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[0][pageLang]
                    }
                  </div>
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[0][pageLang]
                    }
                  </div>
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[0][pageLang]
                    }
                  </div>
                  <div className="footer-column-link">
                    {
                      newHomeLangs.footerSection.footerColumns[0]
                        .columnLinks[0][pageLang]
                    }
                  </div>
                </div>
              </div>
              <div className="footer-column">
                <div className="footer-column-header">Legal</div>
                <div className="footer-column-links">
                  <div className="footer-column-link">Privacy Policy</div>
                  <div className="footer-column-link">Terms of Service</div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
