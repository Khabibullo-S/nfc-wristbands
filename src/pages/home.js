import React, { useState, useEffect, useRef } from "react";
import img1 from '../assets/img/wristband-trio.png'
import Carousel from "react-bootstrap/Carousel";
import "../assets/css/home.css";
import Question from "../component/question";
import Slider from "../component/slider";
import Wpsay from "../component/wpsay";
import VideoPanel from "../component/videoPanel";
import { LOGIN_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";
import {
  createLangs,
  faqLangs,
  footerLangs,
  functionsLangs,
  goalLangs,
  launchLags,
  navLangs,
} from "../utils/multiLang";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const [funcType, setfuncType] = useState("yourself");
  const [pageLang, setPageLang] = useState(
      localStorage.getItem("language") || "uz"
  );
  const handleClick = () => {
    setIsActive((current) => !current);
  };
  const handleFuncChange = (type) => {
    setfuncType(type);
  };

  useEffect(() => {
    // save pageLang to localStorage under "language" key
    localStorage.setItem("language", pageLang);
    console.log(localStorage.getItem("language"));
  }, [pageLang]); // only run when pageLang changes
  // create a ref to store the select element
  const selectRef = useRef(null);
  // use useEffect to run the code when the component mounts
  useEffect(() => {
    // get the language value from local storage
    const language = localStorage.getItem("language");
    // set the value prop of the select element to the language value
    selectRef.current.value = language;
  }); // pass no dependencies

  return (
      <>
        <div className={"container-landing"}>
          <div className="navBar">
            <div className="nav-box">
              <div className="logo-nav">LOGO</div>
              <div className={isActive ? "nav-content active" : "nav-content"}>
                <ul>
                  <li>
                    {/* <a href="#team">For Yourself</a> */}
                    <a href="#team" onClick={() => handleFuncChange("yourself")}>
                      {navLangs.forYou[`${pageLang}`]}
                    </a>
                  </li>
                  <li>
                    <a href="#team" onClick={() => handleFuncChange("team")}>
                      {navLangs.forTeam[`${pageLang}`]}
                    </a>
                  </li>
                  <li>
                    <a href="#product">{navLangs.products[`${pageLang}`]}</a>
                  </li>
                  <li>
                    <a href="#tutroil">{navLangs.tutorials[`${pageLang}`]}</a>
                  </li>
                  <li>
                    <a href="#faq">{navLangs.faqs[`${pageLang}`]}</a>
                  </li>
                </ul>
              </div>
              <div className="nav-component">
                {/* LANGUAGES */}
                <select
                    name="select"
                    onChange={(evt) => setPageLang(evt.target.value)}
                    ref={selectRef}
                >
                  <option value="uz">Uz</option>
                  <option value="ru">Ru</option>
                  <option value="en">En</option>
                </select>
                <Link to={LOGIN_ROUTE} className="account">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                  >
                    <path
                        d="M8 9C10.525 9 12.5714 6.98555 12.5714 4.5C12.5714 2.01445 10.525 0 8 0C5.475 0 3.42857 2.01445 3.42857 4.5C3.42857 6.98555 5.475 9 8 9ZM6.36786 10.6875C2.85 10.6875 0 13.493 0 16.9559C0 17.5324 0.475 18 1.06071 18H14.9393C15.525 18 16 17.5324 16 16.9559C16 13.493 13.15 10.6875 9.63214 10.6875H6.36786Z"
                        fill="black"
                    />
                  </svg>
                </Link>
                <div className="menu" onClick={handleClick}>
                  {isActive ? (
                      <svg
                          className={"x"}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          width="25px"
                          height="25px"
                      >
                        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                      </svg>
                  ) : (
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                          width="25px"
                          height="25px"
                      >
                        <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z" />
                      </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="header-box">
          <div className="header-landing">
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="d-block"
                  src={require("../assets/testImg/braslet.png")}
                  alt="First slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block "
                  src={require("../assets/testImg/braslet.png")}
                  alt="Second slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block"
                  src={require("../assets/testImg/braslet.png")}
                  alt="Third slide"
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div> */}
          <VideoPanel pageLang={pageLang} />

          <Slider pageLang={pageLang} />

          <div className="info">
            <div className="info-box">
              <div className="left-el">
                <img src={require("../assets/img/wristband-duo.png")} alt="" />
              </div>
              <div className="right-el">
                <h1>{createLangs.create[pageLang]}</h1>
                <p>{createLangs.ourProduct[pageLang]}</p>
              </div>
            </div>
          </div>

          <div className="function" id={"team"}>
            <div className="func-box">
              <div className="func-title">
                <h1>{functionsLangs.funcHeader[pageLang]}</h1>
                <div className="func-type">
                  {funcType == "team" ? (
                      <>
                        <div>
                          <h3 onClick={() => handleFuncChange("yourself")}>
                            {functionsLangs.Yourself[pageLang]}
                          </h3>
                        </div>
                        <div>
                          <h3 style={{ background: "white" }}>
                            {functionsLangs.Team[pageLang]}
                          </h3>
                        </div>
                      </>
                  ) : (
                      <>
                        <div>
                          <h3 style={{ background: "white" }}>
                            {functionsLangs.Yourself[pageLang]}
                          </h3>
                        </div>
                        <div>
                          <h3 onClick={() => handleFuncChange("team")}>
                            {functionsLangs.Team[pageLang]}
                          </h3>
                        </div>
                      </>
                  )}
                </div>
              </div>
              <div className="func-content">
                <div className="func-box-content">
                  {funcType == "team" ? (
                      <div className="func-left">
                        <div className="func-left-el">
                          <h1>{functionsLangs.sust[pageLang]}</h1>
                          <p>{functionsLangs.sustText[pageLang]}</p>
                        </div>
                        <div className="func-left-el">
                          <h1>{functionsLangs.track[pageLang]}</h1>
                          <p>{functionsLangs.trackText[pageLang]}</p>
                        </div>
                        <div className="func-left-el">
                          <h1>{functionsLangs.stand[pageLang]}</h1>
                          <p>{functionsLangs.standText[pageLang]}</p>
                        </div>
                      </div>
                  ) : (
                      <div className="func-left">
                        <div className="func-left-el">
                          <h1>{functionsLangs.share[pageLang]}</h1>
                          <p>{functionsLangs.shareText[pageLang]}</p>
                        </div>
                        <div className="func-left-el">
                          <h1>{functionsLangs.save[pageLang]}</h1>
                          <p>{functionsLangs.saveText[pageLang]}</p>
                        </div>
                        <div className="func-left-el">
                          <h1>{functionsLangs.manage[pageLang]}</h1>
                          <p>{functionsLangs.manageText[pageLang]}</p>
                        </div>
                      </div>
                  )}
                  {funcType == "team" ? (
                      <div className="func-right">
                        <img
                            src={img1}
                            alt="img1"
                        />
                      </div>
                  ) : (
                      <div className="func-right">
                        <img src={require("../assets/img/wristband.png")} alt="" />
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="launch" id={"tutroil"}>
            <h1 className={"launch-h1"}>{launchLags.launchHeader[pageLang]}</h1>

            <div className="launch-box">
              <div className="launch-item">
                <div className="launch-step">
                  <h3>{launchLags.step[pageLang]} 01</h3>
                </div>
                <div className="launch-titel">
                  <h1>{launchLags.click[pageLang]}</h1>
                </div>
                <div className="launch-text">
                  <p>{launchLags.clickText[pageLang]}</p>
                </div>
              </div>
              <div className="launch-item">
                <div className="launch-step">
                  <h3>{launchLags.step[pageLang]} 02</h3>
                </div>
                <div className="launch-titel">
                  <h1>{launchLags.set[pageLang]}</h1>
                </div>
                <div className="launch-text">
                  <p>{launchLags.setText[pageLang]}</p>
                </div>
              </div>
              <div className="launch-item">
                <div className="launch-step">
                  <h3>{launchLags.step[pageLang]} 03</h3>
                </div>
                <div className="launch-titel">
                  <h1>{launchLags.all[pageLang]}</h1>
                </div>
                <div className="launch-text">
                  <p>{launchLags.allText[pageLang]}</p>
                </div>
              </div>
            </div>
            <div className="launch-btn">
              <a href="#">{launchLags.getStarted[pageLang]}</a>
            </div>
          </div>

          <div className="info" id={"product"}>
            <div className="info-box">
              <div className="left-el">
                <img
                    src={require("../assets/img/wristband-reverse.png")}
                    alt=""
                />
              </div>
              <div className="right-el">
                <h1>{goalLangs.goal[pageLang]}</h1>
                <p>{goalLangs.goalText[pageLang]}</p>
              </div>
            </div>
          </div>

          <div className="faq" id="faq">
            <h1>{faqLangs.faqHeader[pageLang]}</h1>
            <div //flex flex-col gap-8 items-start justify-start max-w-[766px] w-full
                className="faq-container"
            >
              {faqLangs.faqs[pageLang].map((faq, index) => (
                  <Question
                      // deleted this:  gap-8
                      // bg-gray-100 flex flex-col items-center justify-center p-8 sm:px-5 rounded-[28px] w-full
                      className="faq-item"
                      faq={faq}
                      key={index}
                  />
              ))}
            </div>
          </div>
          <Wpsay pageLang={pageLang} />
          <footer style={{ fontFamily: "Rubik" }}>
            <div className="footer-container">
              <div className="footer-main">
                <div className="footer-text">
                  <div className="footer-text-content" size="txtRubikRegular16">
                    {footerLangs.footerText[pageLang]}
                  </div>
                </div>
                <div className="footer-links">
                  <div className="footer-links-column">
                    <div className="footer-links-header" size="txtRubikMedium24">
                      {footerLangs.links[pageLang]}
                    </div>
                    <ul className="footer-links-list">
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.product[pageLang]}
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.faqs[pageLang]}
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.blog[pageLang]}
                          </div>
                        </a>
                      </li>
                      {/* <li>
                      <a href="javascript:" className="footer-link">
                        <div
                          className="footer-list-item"
                          size="txtRubikRegular16"
                        >
                          Blog
                        </div>
                      </a>
                    </li> */}
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <div className="footer-links-header" size="txtRubikMedium24">
                      {footerLangs.information[pageLang]}
                    </div>
                    <ul className="footer-links-list">
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.aboutus[pageLang]}
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.contacts[pageLang]}
                          </div>
                        </a>
                      </li>
                      {/*<li>
                      <a href="javascript:" className="footer-link">
                        <div
                          className="footer-list-item"
                          size="txtRubikRegular16"
                        >
                          Cookie policy
                        </div>
                      </a>
                    </li> */}
                    </ul>
                  </div>
                  <div className="footer-links-column">
                    <div className="footer-links-header" size="txtRubikMedium24">
                      {footerLangs.others[pageLang]}
                    </div>
                    <ul className="footer-links-list">
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.terms[pageLang]}
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:" className="footer-link">
                          <div
                              className="footer-list-item"
                              size="txtRubikRegular16"
                          >
                            {footerLangs.cookie[pageLang]}
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <div className="line" />
                <div className="footer-logo">
                  <div className="footer-logo-text" size="txtRubikRegular14">
                    {footerLangs.allRights[pageLang]}
                  </div>
                  <div className="footer-logo-icon">
                    {footerLangs.createdBy[pageLang]}
                    {/* <img
                    className="footer-icon"
                    src="images/img_play.svg"
                    alt="play"
                  /> */}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
  );
};

export default Home;