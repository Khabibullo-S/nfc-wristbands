import { React, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import VCard from "vcard-creator";
import "../assets/css/Contact.css";
import { $host } from "../http";
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const themes = {
  whiteBlack: {
    main: { red: 255, green: 255, blue: 255 },
    secondary: { red: 0, green: 0, blue: 0 },
  },
  blackWhite: {
    main: { red: 0, green: 0, blue: 0 },
    secondary: { red: 255, green: 255, blue: 255 },
  },
  greenBlack: {
    main: { red: 125, green: 186, blue: 40 },
    secondary: { red: 0, green: 0, blue: 0 },
  },
};

const UserPageContact = (comingProps) => {
  const props = comingProps.data;
  const { username } = useParams(); //comment
  const [data, setData] = useState({}); //comment

  const listTheme = [
    {theme: 'whiteBlack', color1: '#fff', color2: '#000', textColor: '#000', textColor2: '#fff'},
    {theme: 'greenBlack', color1: '#7dba28', color2: '#000', textColor: '#fff', textColor2: '#fff'},
    {theme: 'blackGreen', color1: '#000', color2: '#7dba28', textColor: '#fff', textColor2: '#fff'},
    {theme: 'blackGold', color1: '#000', color2: '#d4af37', textColor: '#fff', textColor2: '#fff'},
    {theme: 'blackPink', color1: '#000', color2: '#d4a', textColor: '#fff', textColor2: '#fff'}
  ]



  /* SET/CHANGE CSS VARIABLES */

  const MAIN_COLOR = themes.whiteBlack.main; /* rgb(125, 186, 40) */
  const SECONDARY_COLOR = themes.whiteBlack.secondary; /* rgb(255, 255, 255) */

  // if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 else use #ffffff
  const TEXT_MAIN_COLOR =
    MAIN_COLOR.red * 0.299 +
      MAIN_COLOR.green * 0.587 +
      MAIN_COLOR.blue * 0.114 >
    186
      ? "#000000"
      : "#ffffff";
  const TEXT_SECONDARY_COLOR =
    SECONDARY_COLOR.red * 0.299 +
      SECONDARY_COLOR.green * 0.587 +
      SECONDARY_COLOR.blue * 0.114 >
    186
      ? "#000000"
      : "#ffffff";
  const LINK_COLOR =
    TEXT_SECONDARY_COLOR == "#000000"
      ? { red: 100, green: 149, blue: 237 }
      : {
          red: SECONDARY_COLOR.red + 120,
          green: SECONDARY_COLOR.green + 120,
          blue: SECONDARY_COLOR.blue + 120,
        };
  const BUTTON_COLOR =
    MAIN_COLOR.red * 0.299 +
      MAIN_COLOR.green * 0.587 +
      MAIN_COLOR.blue * 0.114 >
    100
      ? "#000000"
      : "#ffffff";

  document.documentElement.style.cssText = `--contact-main-color: rgb(${
    MAIN_COLOR.red
  }, ${MAIN_COLOR.green}, ${MAIN_COLOR.blue});
  --contact-secondary-color: rgb(${SECONDARY_COLOR.red}, ${
    SECONDARY_COLOR.green
  }, ${SECONDARY_COLOR.blue});
  --contact-text-main-color: ${TEXT_MAIN_COLOR};
  --contact-text-secondary-color: ${TEXT_SECONDARY_COLOR};
  --contact-link-color: rgb(${LINK_COLOR.red}, ${LINK_COLOR.green}, ${
    LINK_COLOR.blue
  });
  --contact-button-color: ${BUTTON_COLOR};
  --contact-button-inverted-color: ${
    BUTTON_COLOR == "#000000" ? "#ffffff" : "#000000"
  }
  `;

  /* END OF CSS CHANGES */

  /* FOR SHARING URL */

  const CURRENTURL = window.location.href;
  const SHARETEXT = "Check this contact";
  let telegramUrl = `tg://msg_url?url=${CURRENTURL}&text=${SHARETEXT}`;
  // let instagramUrl = `https://www.instagram.com/share?url=${CURRENTURL}&text=${SHARETEXT}`; Share via Instagram doesn't work with text you can only share photos or videos
  let instagramUrl = `https://www.instagram.com/`;
  let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${CURRENTURL}&quote=${SHARETEXT}`;
  let twitterUrl = `https://twitter.com/intent/tweet?url=${CURRENTURL}&text=${SHARETEXT}`;
  let linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${CURRENTURL}&mini=true&title=${SHARETEXT}`;
  let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    CURRENTURL + " " + SHARETEXT
  )}`;
  let messengerUrl = `https://www.messenger.com/t/?u=${encodeURIComponent(
    CURRENTURL
  )}&quote=${SHARETEXT}`;
  let emailUrl = `mailto:?subject=${SHARETEXT}&body=${CURRENTURL}`;

  // For sharing through default share function of browser ->
  // Define a state variable to store the share status
  const [shared, setShared] = useState(false);

  // Define a function to handle the share event
  const handleShare = async () => {
    try {
      // Try to share the current page using the Web Share API
      await navigator.share({
        title: document.title,
        text: "Check this contact",
        url: window.location.href,
      });
      // If successful, update the shared state
      setShared(true);
    } catch (err) {
      // If failed, update the shared state and log the error
      setShared(false);
      console.error(err);
    }
  };
  // <-

  /* END OF URL SHARING */

  // active navbar
  const [activeNav, setActiveNav] = useState("1");
  const handleNavBtnClick = (key) => {
    setActiveNav(key);
  };

  // toggle share
  const [showShare, setShowShare] = useState(false);
  const handleShareToggle = (event) => {
    // Stop the propagation of the click event to prevent conflicts
    event.stopPropagation();
    setShowShare(!showShare);
  };

  const shareContactRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showShare &&
        shareContactRef.current &&
        !shareContactRef.current.contains(event.target)
      ) {
        setShowShare(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showShare]);

  // Copy url button function ->
  // Define a state variable to store the copy status
  const [copied, setCopied] = useState(false);

  // Define a function to handle the copy event
  const handleCopy = async () => {
    try {
      // Try to copy the text using the Clipboard API
      await navigator.clipboard.writeText(window.location.href);
      // If successful, update the copied state
      setCopied(true);
      // Reset the copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // If failed, update the copied state and log the error
      setCopied(false);
      console.error(err);
    }
  };


  const getUser = async () => {
    //comment
    try {
      const res = await $host.get("api/v1/contact/" + username);
      setData(res.data);
      console.log(res.data)
    } catch (e) {
      console.log(e);
      return window.location.assign("/");
    }
  };
  useEffect(() => {
    getUser();
  }, [window.location.href]);

  const contactVCF = async () => {
    try {
      const res = await $host.get("api/v1/vcard/" + username);
      const blob = new Blob([res.data], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.username}.vcf`;
      a.click();
      // URL.revokeObjectURL(url);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const contactContent = (
    <>
      <div className="contact-info-item">
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.98 7.023v-4a1 1 0 1 1 2 0v2.611C17.61 5 21.681.908 22.273.316a1 1 0 1 1 1.414 1.414c-.592.592-4.642 4.665-5.268 5.293h2.561a1 1 0 1 1 0 2h-4a2 2 0 0 1-2-2Zm8.095 9.739a3.1 3.1 0 0 1 0 4.378l-.912 1.05c-8.19 7.838-28.119-12.084-20.4-20.3l1.15-1A3.081 3.081 0 0 1 7.24.929c.031.03 1.883 2.438 1.883 2.438a3.109 3.109 0 0 1-.006 4.282L7.96 9.105a12.783 12.783 0 0 0 6.931 6.945l1.465-1.165a3.1 3.1 0 0 1 4.28-.006s2.41 1.853 2.44 1.883ZM21.7 18.216s-2.393-1.842-2.424-1.872a1.1 1.1 0 0 0-1.549 0c-.027.026-2.044 1.634-2.044 1.634a1 1 0 0 1-.979.152A15.008 15.008 0 0 1 5.88 9.319a1 1 0 0 1 .145-1s1.608-2.014 1.635-2.04a1.1 1.1 0 0 0 0-1.549c-.03-.03-1.872-2.425-1.872-2.425a1.1 1.1 0 0 0-1.51.039l-1.15 1c-5.642 6.783 11.63 23.097 17.573 17.483l.912-1.051a1.12 1.12 0 0 0 .088-1.56Z"
            fill="var(--incoming-call-icon-color, currentColor)"
          ></path>
        </svg>
        <div className="item-text">
          <span className="info-label">Mobile Phone</span>
          <a href={"tel:+" + data.phone}>
            <span>{data.phone}</span>
          </a>
        </div>
      </div>

      {data.email ? (
        <div className="contact-info-item">
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#id1)">
              <path
                d="M19 1H5a5 5 0 0 0-5 5v12a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5ZM5 3h14a3 3 0 0 1 2.78 1.89l-7.66 7.66a3 3 0 0 1-4.24 0L2.22 4.89A3 3 0 0 1 5 3Zm14 18H5a3 3 0 0 1-3-3V7.5l6.46 6.46a5 5 0 0 0 7.08 0L22 7.5V18a3 3 0 0 1-3 3Z"
                fill="var(--envelope-icon-color, currentColor)"
              ></path>
            </g>
            <defs>
              <clipPath id="id1">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <div className="item-text">
            <span className="info-label">Email</span>
            <a>
              <span>{data.email}</span>
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
      {data.address ? (
        <div className="contact-info-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              clip-path="url(#id2)"
              fill="var(--map-marker-icon-color, currentColor)"
            >
              <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"></path>
              <path d="M12 24a5.27 5.27 0 0 1-4.31-2.2c-3.812-5.257-5.745-9.209-5.745-11.747a10.055 10.055 0 0 1 20.11 0c0 2.538-1.933 6.49-5.744 11.747a5.271 5.271 0 0 1-4.31 2.2Zm0-21.819a7.883 7.883 0 0 0-7.874 7.874c0 2.01 1.893 5.727 5.33 10.466a3.145 3.145 0 0 0 5.09 0c3.435-4.739 5.328-8.456 5.328-10.466A7.883 7.883 0 0 0 12 2.181Z"></path>
            </g>
            <defs>
              <clipPath id="id2">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <div className="item-text">
            <span className="info-label">Location</span>
            <a>
              <span>
                {data.address.country +
                  " " +
                  data.address.city +
                  " " +
                  data.address.region +
                  " " +
                  data.address.street}
              </span>
            </a>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
  const companyContent = (
    <>
      <div className="contact-info-item">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#id3)">
            <path
              d="M7 14a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm4-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm-5 4H5a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm5 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2ZM6 5H5a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm5 0h-1a1 1 0 0 0 0 2h1a1 1 0 1 0 0-2ZM6 9H5a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm5 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm13 1v9a5.006 5.006 0 0 1-5 5H5a5.006 5.006 0 0 1-5-5V5a5.006 5.006 0 0 1 5-5h6a5.006 5.006 0 0 1 5 5h3a5.006 5.006 0 0 1 5 5ZM5 22h9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3Zm17-12a3 3 0 0 0-3-3h-3v15h3a3 3 0 0 0 3-3v-9Zm-3 3a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0-8a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
              fill="var(--building-icon-color, currentColor)"
            ></path>
          </g>
          <defs>
            <clipPath id="id3">
              <path fill="#fff" d="M0 0h24v24H0z"></path>
            </clipPath>
          </defs>
        </svg>
        <div className="item-text">
          <span className="info-label">Company</span>
          <span>{data.work_info && data.work_info.org}</span>
        </div>
      </div>
      <div className="contact-info-item">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 4h-4V3a3 3 0 0 0-6 0v1H5a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5Zm-8-1a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V3Zm11 16a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.18a2.98 2.98 0 0 0 5.64 0H19a3 3 0 0 1 3 3v10Zm-12-9H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-1 8H6v-6h3v6Zm11-3a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1Zm0-4a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 1 1Zm-2 8a1 1 0 0 1-1 1h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1Z"
            fill="var(--id-badge-icon-color, currentColor)"
          ></path>
        </svg>
        <div className="item-text">
          <span className="info-label">Profession</span>
          <span>{data.work_info && data.work_info.role}</span>
        </div>
      </div>
    </>
  );
  const shareContactContent = (
    <>
      <div className="share-contact">
        <div ref={shareContactRef} className="share-box">
          <div className="container">
            {/* SHARE TOP */}
            <div className="share-top">
              <div className="share-header">
                <div>Share This Contact!</div>
                <div className="share-close">
                  <div onClick={handleShareToggle}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      data-testid="CloseButton"
                      enable-background="new 0 0 24 24"
                    >
                      <path
                        d="M13.3536 3.35357L13.7072 3.00001L13.0001 2.29291L12.6465 2.64646L13.3536 3.35357ZM2.64652 12.6465L2.29297 13L3.00008 13.7071L3.35363 13.3536L2.64652 12.6465ZM3.35363 2.64646L3.00008 2.29291L2.29297 3.00001L2.64652 3.35357L3.35363 2.64646ZM12.6465 13.3536L13.0001 13.7071L13.7072 13L13.3536 12.6465L12.6465 13.3536ZM12.6465 2.64646L2.64652 12.6465L3.35363 13.3536L13.3536 3.35357L12.6465 2.64646ZM2.64652 3.35357L12.6465 13.3536L13.3536 12.6465L3.35363 2.64646L2.64652 3.35357Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="share-list">
                <Link className="share-list-item" to={telegramUrl}>
                  <div className="share-item-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Telegram"
                      viewBox="0 0 512 512"
                    >
                      <rect width="512" height="512" fill="#37aee2" rx="15%" />
                      <path
                        fill="#c8daea"
                        d="M199 404c-11 0-10-4-13-14l-32-105 245-144"
                      />
                      <path
                        fill="#a9c9dd"
                        d="M199 404c7 0 11-4 16-8l45-43-56-34"
                      />
                      <path
                        fill="#f6fbfe"
                        d="M204 319l135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"
                      />
                    </svg>
                    <div>Share via Telegram</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link
                  className="share-list-item"
                  to={instagramUrl}
                  onClick={handleCopy}
                >
                  <div className="share-item-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 28.87 28.87"
                      id="instagram"
                    >
                      <defs>
                        <linearGradient
                          id="a"
                          x1="-1.84"
                          x2="32.16"
                          y1="30.47"
                          y2="-3.03"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#fed576"></stop>
                          <stop offset=".26" stop-color="#f47133"></stop>
                          <stop offset=".61" stop-color="#bc3081"></stop>
                          <stop offset="1" stop-color="#4c63d2"></stop>
                        </linearGradient>
                      </defs>
                      <g data-name="Layer 2">
                        <g data-name="Layer 1">
                          <rect
                            width="28.87"
                            height="28.87"
                            fill="url(#a)"
                            rx="15%"
                          ></rect>
                          <g data-name="<Group>">
                            <path
                              fill="#fff"
                              d="M10 5h9c.2.1.5.1.7.2a4.78 4.78 0 0 1 3.8 3.3 8 8 0 0 1 .3 1.5v8.8a6.94 6.94 0 0 1-1.2 3.1 5.51 5.51 0 0 1-4.5 1.9h-7.5a5.49 5.49 0 0 1-3.7-1.2A5.51 5.51 0 0 1 5 18.14v-7a7.57 7.57 0 0 1 .1-1.5 4.9 4.9 0 0 1 3.8-4.3zm-3.1 9.5v3.9a3.42 3.42 0 0 0 3.7 3.7q3.9.15 7.8 0c2.3 0 3.6-1.4 3.7-3.7q.15-3.9 0-7.8a3.52 3.52 0 0 0-3.7-3.7q-3.9-.15-7.8 0a3.42 3.42 0 0 0-3.7 3.7z"
                              data-name="<Compound Path>"
                            ></path>
                            <path
                              fill="#fff"
                              d="M9.64 14.54a4.91 4.91 0 0 1 4.9-4.9 5 5 0 0 1 4.9 4.9 4.91 4.91 0 0 1-4.9 4.9 5 5 0 0 1-4.9-4.9zm4.9-3.1a3.05 3.05 0 1 0 3 3 3 3 0 0 0-3-3z"
                              data-name="<Compound Path>"
                            ></path>
                            <path
                              fill="#fff"
                              d="M18.34 9.44a1.16 1.16 0 0 1 1.2-1.2 1.29 1.29 0 0 1 1.2 1.2 1.2 1.2 0 0 1-2.4 0z"
                              data-name="<Path>"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div>Share via Instagram</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="share-list-item" to={facebookUrl}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 24 24"
                      data-testid="ShareIcon-facebook"
                      enable-background="new 0 0 24 24"
                    >
                      <rect
                        width="24"
                        height="24.0004"
                        rx="4"
                        fill="#1877F2"
                      ></rect>
                      <path
                        d="M18 12.0002C18 8.68611 15.3141 6.00012 12 6.00012C8.68594 6.00012 6 8.68611 6 12.0002C6 14.9956 8.19375 17.4777 11.0625 17.9277V13.7346H9.53906V12.0002H11.0625V10.6783C11.0625 9.17479 11.9578 8.34391 13.3289 8.34391C13.9852 8.34391 14.6719 8.4611 14.6719 8.4611V9.93769H13.9148C13.1695 9.93769 12.9375 10.4006 12.9375 10.8752V12.0002H14.6016L14.3355 13.7346H12.9375V17.9277C15.8062 17.4777 18 14.9956 18 12.0002Z"
                        fill="white"
                      ></path>
                    </svg>
                    <div>Share on Facebook</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="share-list-item" to={linkedinUrl}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 24 24"
                      data-testid="ShareIcon-linkedin"
                      enable-background="new 0 0 24 24"
                      class="sc-gKsewC fzJjte"
                    >
                      <g clip-path="url(#clip0_657_585)">
                        <rect
                          y="0.000488281"
                          width="24"
                          height="24.0004"
                          rx="4"
                          fill="#0A66C2"
                        ></rect>
                        <path
                          d="M8.65574 10.1318H6.19672V18.0008H8.65574V10.1318ZM8.87705 7.42687C8.87835 7.24086 8.84299 7.05642 8.77301 6.88407C8.70302 6.71173 8.59977 6.55486 8.46916 6.42242C8.33855 6.28997 8.18313 6.18456 8.01178 6.11218C7.84043 6.03981 7.6565 6.0019 7.47049 6.00061H7.42623C7.04797 6.00061 6.6852 6.15088 6.41773 6.41835C6.15026 6.68583 6 7.0486 6 7.42687C6 7.80513 6.15026 8.16791 6.41773 8.43538C6.6852 8.70285 7.04797 8.85312 7.42623 8.85312C7.61225 8.8577 7.79734 8.82557 7.97094 8.75859C8.14454 8.69161 8.30324 8.59107 8.43797 8.46273C8.57271 8.33439 8.68083 8.18076 8.75617 8.01062C8.83151 7.84047 8.87258 7.65715 8.87705 7.47113V7.42687ZM18 13.2204C18 10.8548 16.4951 9.93511 15 9.93511C14.5105 9.91059 14.0231 10.0149 13.5864 10.2375C13.1498 10.4601 12.7791 10.7934 12.5115 11.204H12.4426V10.1318H10.1311V18.0008H12.5902V13.8155C12.5546 13.3869 12.6896 12.9615 12.9659 12.6318C13.2421 12.3022 13.6373 12.0948 14.0656 12.0548H14.159C14.941 12.0548 15.5213 12.5466 15.5213 13.786V18.0008H17.9803L18 13.2204Z"
                          fill="white"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_657_585">
                          <path
                            d="M0 4.00049C0 1.79135 1.79086 0.000488281 4 0.000488281H20C22.2091 0.000488281 24 1.79135 24 4.00049V20.0009C24 22.2101 22.2091 24.0009 20 24.0009H4C1.79086 24.0009 0 22.2101 0 20.0009V4.00049Z"
                            fill="white"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Share on LinkedIn</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="share-list-item" to={twitterUrl}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 24 24"
                      data-testid="ShareIcon-twitter"
                      enable-background="new 0 0 24 24"
                      class="sc-gKsewC fzJjte"
                    >
                      <g clip-path="url(#clip0_657_1097)">
                        <rect
                          y="0.000854492"
                          width="24"
                          height="24.0004"
                          rx="4"
                          fill="#1DA1F2"
                        ></rect>
                        <path
                          d="M18 8.35151C17.5587 8.54635 17.0846 8.67799 16.5863 8.7375C17.0947 8.43419 17.4847 7.95289 17.6686 7.37997C17.193 7.66116 16.6661 7.86548 16.1053 7.975C15.6561 7.49897 15.0166 7.20093 14.3085 7.20093C12.9492 7.20093 11.8467 8.29938 11.8467 9.6548C11.8467 9.84648 11.8689 10.0329 11.9102 10.213C9.8633 10.1103 8.05003 9.13349 6.83555 7.64958C6.62415 8.01292 6.5026 8.43419 6.5026 8.88283C6.5026 9.73379 6.93755 10.4852 7.59764 10.9249C7.19387 10.9118 6.81441 10.8017 6.48252 10.6179V10.6495C6.48252 11.838 7.33075 12.8296 8.4575 13.055C8.25033 13.1108 8.03312 13.1403 7.80904 13.1403C7.65049 13.1403 7.49564 13.1255 7.34555 13.0971C7.65894 14.0713 8.56796 14.7811 9.64556 14.8C8.80261 15.4583 7.74086 15.8506 6.58769 15.8506C6.38897 15.8506 6.1929 15.839 6 15.8164C7.08976 16.513 8.38351 16.9185 9.77345 16.9185C14.3027 16.9185 16.7786 13.1808 16.7786 9.93916C16.7786 9.83384 16.776 9.72747 16.7712 9.62216C17.2522 9.27566 17.6697 8.84439 17.9989 8.35309L18 8.35151Z"
                          fill="white"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_657_1097">
                          <path
                            d="M0 4.00085C0 1.79172 1.79086 0.000854492 4 0.000854492H20C22.2091 0.000854492 24 1.79172 24 4.00085V20.0013C24 22.2104 22.2091 24.0013 20 24.0013H4C1.79086 24.0013 0 22.2104 0 20.0013V4.00085Z"
                            fill="white"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Share on Twitter</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="share-list-item" to={whatsappUrl}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 24 24"
                      data-testid="ShareIcon-whatsapp"
                      enable-background="new 0 0 24 24"
                      class="sc-gKsewC fzJjte"
                    >
                      <g clip-path="url(#clip0_657_572)">
                        <rect
                          y="0.0012207"
                          width="24"
                          height="24.0004"
                          rx="4"
                          fill="#00E676"
                        ></rect>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M16.201 7.74608C15.0805 6.61991 13.5866 6.00122 11.9957 6.00122C8.71989 6.00122 6.05132 8.66984 6.04847 11.9457C6.04847 12.9949 6.32217 14.0156 6.84105 14.9194L6 18.0014L9.15324 17.1746C10.0228 17.6479 11.0007 17.8988 11.9957 17.8988H11.9986C15.2744 17.8988 17.943 15.2302 17.9458 11.9514C17.943 10.3634 17.3243 8.86941 16.201 7.74608ZM11.9957 16.8924C11.1062 16.8924 10.2366 16.6529 9.47826 16.2024L9.29865 16.0941L7.42837 16.5844L7.9273 14.7598L7.81041 14.5716C7.31433 13.7847 7.05488 12.8752 7.05488 11.9429C7.05488 9.22295 9.27299 7.0048 11.9986 7.0048C13.3186 7.0048 14.5588 7.52085 15.4939 8.45315C16.4262 9.38831 16.9394 10.6285 16.9394 11.9486C16.9366 14.6771 14.7185 16.8924 11.9957 16.8924ZM14.7071 13.1917C14.5588 13.1175 13.8289 12.7583 13.6921 12.707C13.5552 12.6585 13.4555 12.6328 13.3585 12.7811C13.2587 12.9294 12.9736 13.2658 12.8881 13.3627C12.8026 13.4625 12.7142 13.4739 12.5659 13.3998C12.4177 13.3257 11.9387 13.1688 11.3713 12.6614C10.9294 12.2679 10.6329 11.7804 10.5445 11.6321C10.459 11.4839 10.536 11.404 10.6101 11.3299C10.6757 11.2643 10.7584 11.156 10.8325 11.0704C10.9066 10.9849 10.9323 10.9222 10.9808 10.8224C11.0292 10.7226 11.0064 10.6371 10.9694 10.563C10.9323 10.4888 10.6358 9.7561 10.5103 9.45959C10.3906 9.16878 10.268 9.20869 10.1768 9.20584C10.0912 9.20014 9.99145 9.20014 9.89166 9.20014C9.79187 9.20014 9.63222 9.2372 9.49537 9.38546C9.35852 9.53371 8.97648 9.89295 8.97648 10.6257C8.97648 11.3584 9.50962 12.0626 9.58375 12.1624C9.65788 12.2622 10.6301 13.7619 12.1212 14.4062C12.4747 14.5602 12.7512 14.6514 12.9679 14.7198C13.3243 14.8339 13.6465 14.8168 13.9031 14.7797C14.1882 14.7369 14.7812 14.4205 14.9066 14.0726C15.0292 13.7248 15.0292 13.4283 14.9922 13.3656C14.9551 13.3028 14.8553 13.2658 14.7071 13.1917Z"
                          fill="white"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_657_572">
                          <path
                            d="M0 4.00122C0 1.79208 1.79086 0.0012207 4 0.0012207H20C22.2091 0.0012207 24 1.79208 24 4.00122V20.0016C24 22.2108 22.2091 24.0016 20 24.0016H4C1.79086 24.0016 0 22.2108 0 20.0016V4.00122Z"
                            fill="white"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Share via WhatsApp</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="share-list-item" to={messengerUrl}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 24 24"
                      data-testid="ShareIcon-messenger"
                      enable-background="new 0 0 24 24"
                      class="sc-gKsewC fzJjte"
                    >
                      <g clip-path="url(#clip0_657_559)">
                        <rect
                          y="0.00170898"
                          width="24"
                          height="24.0004"
                          rx="4"
                          fill="#F1F1F1"
                        ></rect>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 6.00171C8.62002 6.00171 6 8.4776 6 11.8218C6 13.5711 6.71688 15.0826 7.88434 16.1267C7.98234 16.2144 8.0415 16.3373 8.04552 16.4688L8.0782 17.5361C8.08864 17.8765 8.44029 18.0981 8.75181 17.9605L9.94273 17.4348C10.0437 17.3903 10.1568 17.382 10.2632 17.4113C10.8104 17.5618 11.3929 17.6419 12 17.6419C15.38 17.6419 18 15.166 18 11.8218C18 8.4776 15.38 6.00171 12 6.00171Z"
                          fill="url(#paint0_radial_657_559)"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M8.39691 13.5238L10.1594 10.7275C10.4398 10.2827 11.0401 10.1719 11.4608 10.4874L12.8626 11.5388C12.9912 11.6353 13.1682 11.6347 13.2962 11.5375L15.1895 10.1007C15.4421 9.90896 15.772 10.2114 15.6029 10.4797L13.8404 13.276C13.56 13.7208 12.9596 13.8316 12.539 13.5161L11.1372 12.4647C11.0086 12.3682 10.8316 12.3688 10.7035 12.466L8.81031 13.9028C8.55762 14.0945 8.22777 13.7921 8.39691 13.5238Z"
                          fill="white"
                        ></path>
                      </g>
                      <defs>
                        <radialGradient
                          id="paint0_radial_657_559"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(8.3097 17.9377) scale(13.0752 13.0754)"
                        >
                          <stop stop-color="#0099FF"></stop>
                          <stop offset="0.609754" stop-color="#A033FF"></stop>
                          <stop offset="0.934823" stop-color="#FF5280"></stop>
                          <stop offset="1" stop-color="#FF7061"></stop>
                        </radialGradient>
                        <clipPath id="clip0_657_559">
                          <path
                            d="M0 4.00171C0 1.79257 1.79086 0.00170898 4 0.00170898H20C22.2091 0.00170898 24 1.79257 24 4.00171V20.0021C24 22.2113 22.2091 24.0021 20 24.0021H4C1.79086 24.0021 0 22.2113 0 20.0021V4.00171Z"
                            fill="white"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Share via Messenger</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <Link className="share-list-item" to={emailUrl}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 48 48"
                      data-testid="ShareIcon-email"
                      enable-background="new 0 0 24 24"
                      class="sc-gKsewC fzJjte"
                    >
                      <rect
                        y="0.000488281"
                        width="48"
                        height="48"
                        rx="8"
                        fill="#60696C"
                      ></rect>
                      <path
                        d="M24.154 26.5681C24.2473 26.6569 24.3712 26.7064 24.5 26.7061C24.6288 26.7064 24.7527 26.6569 24.846 26.5681L26.2624 25.2141L31.454 30.1901C31.5471 30.2793 31.6711 30.3291 31.8 30.3291C32.0042 30.3291 32.1879 30.205 32.264 30.0155C32.3401 29.8261 32.2934 29.6093 32.146 29.4681L26.986 24.5224L32.214 19.5251C32.3432 19.4016 32.3966 19.2187 32.3543 19.0451C32.312 18.8715 32.1803 18.7337 32.0088 18.6836C31.8373 18.6335 31.6522 18.6786 31.523 18.8021L25.9411 24.1376C25.9242 24.1517 25.9083 24.1669 25.8934 24.1832L24.5 25.5151L23.1138 24.1901C23.1093 24.185 23.1047 24.18 23.1 24.1751C23.0849 24.1593 23.0689 24.1447 23.0524 24.1313L17.477 18.8021C17.3478 18.6786 17.1627 18.6335 16.9912 18.6836C16.8197 18.7337 16.688 18.8715 16.6457 19.0451C16.6034 19.2187 16.6568 19.4016 16.786 19.5251L22.0145 24.5229L16.853 29.4701C16.7062 29.6116 16.66 29.8281 16.7363 30.0172C16.8126 30.2063 16.9961 30.3301 17.2 30.3301C17.3296 30.3306 17.4544 30.2808 17.548 30.1911L22.7381 25.2147L24.154 26.5681Z"
                        fill="white"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M35 29.3181C34.9978 31.349 33.3519 32.9949 31.321 32.9971H17.679C15.6481 32.9949 14.0022 31.349 14 29.3181V19.6761C14.0022 17.6451 15.6481 15.9993 17.679 15.9971H31.321C33.3519 15.9993 34.9978 17.6451 35 19.6761V29.3181ZM17.679 16.9971C16.2001 16.9987 15.0017 18.1972 15 19.6761V29.3181C15.0017 30.797 16.2001 31.9954 17.679 31.9971H31.321C32.7999 31.9954 33.9983 30.797 34 29.3181V19.6761C33.9983 18.1972 32.7999 16.9987 31.321 16.9971H17.679Z"
                        fill="white"
                      ></path>
                    </svg>
                    <div>Share via Email</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </Link>
                <div className="share-list-item" onClick={handleShare}>
                  <div className="share-item-right">
                    <svg
                      viewBox="0 0 48 48"
                      data-testid="ShareIcon-moreOptions"
                      enable-background="new 0 0 24 24"
                      class="sc-gKsewC fzJjte"
                    >
                      <rect
                        y="0.000488281"
                        width="48"
                        height="48"
                        rx="8"
                        fill="#F3F3F1"
                      ></rect>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M28.1678 16.8744L28.5415 17.2065L29.2059 16.4591L28.8322 16.127L24.3322 12.127H23.6678L19.1678 16.127L18.7941 16.4591L19.4585 17.2065L19.8322 16.8744L23.4998 13.6143V26.5012V27.0012H24.4998V26.5012V13.6139L28.1678 16.8744ZM15 20.0007H15.5H20.5001H21.0001V21.0007H20.5001H16V34.0012H32.0003V21.0007H27.5002H27.0002V20.0007H27.5002H32.5003H33.0003V20.5007V34.5012V35.0012H32.5003H15.5H15V34.5012V20.5007V20.0007Z"
                        fill="black"
                      ></path>
                    </svg>
                    <div>More options</div>
                  </div>
                  <div>
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      id="chevron"
                    >
                      <path d="M13.25 10 6.109 2.58a.697.697 0 0 1 0-.979.68.68 0 0 1 .969 0l7.83 7.908a.697.697 0 0 1 0 .979l-7.83 7.908a.68.68 0 0 1-.969 0 .697.697 0 0 1 0-.979L13.25 10z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="share-copy" onClick={handleCopy}>
                <div className="share-copy-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 25"
                    height="25"
                  >
                    <path
                      d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24.0019H10.038V16.16Z"
                      fill="#43E660"
                    ></path>
                  </svg>
                  <div className="truncate">{window.location.href}</div>
                </div>
                <div style={{ color: copied ? "green" : "black" }}>
                  {/* {data.first_name && data.first_name[0]}
                  {data.last_name && data.last_name[0]} */}
                  {copied ? <>Copied!</> : <>Copy</>}
                </div>
              </div>
            </div>

            <div className="share-bottom">
              <div className="share-bottom-header">
                <div>Create your own Contact</div>
                <div>The only link in bio trusted by top companies</div>
              </div>
              <div className="share-bottom-btns">
                <div className="share-bottom-btn">
                  <Link style={{ color: "white" }} to={REGISTRATION_ROUTE}>
                    Sign up free
                  </Link>
                </div>
                <div className="share-bottom-btn">
                  <Link style={{ color: "black" }} to={HOME_ROUTE}>
                    Find out more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {listTheme.map((item, index)=>{
        const activeNavCss = {

          background: item.color2,
          color: item.textColor2,
        }
        if (item.theme === data.theme){
          return(<div className="User-page-contact" key={index}>
            <>{showShare ? shareContactContent : <></>}</>
            <div className="contact">
              {/* key={props.id}  */}
              <div className="contact-box" style={{background:item.color2}}>
                <div className="container" style={{background:item.color1}}>
                  <>

                    <div
                        className="threeDots"
                        style={showShare ? { opacity: "0" } : {}}
                    >
                      <div
                          onClick={(event) => handleShareToggle(event)}
                          style={{background:item.color2}}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path
                              fill={item.color1}
                              stroke={item.color1}
                              d="M12.6661 7.33348C12.2979 7.33348 11.9994 7.63195 11.9994 8.00014C11.9994 8.36833 12.2979 8.66681 12.6661 8.66681C13.0343 8.66681 13.3328 8.36833 13.3328 8.00014C13.3328 7.63195 13.0343 7.33348 12.6661 7.33348Z"
                          ></path>
                          <path
                              fill={item.color1}
                              stroke={item.color1}
                              d="M8.00057 7.33348C7.63238 7.33348 7.3339 7.63195 7.3339 8.00014C7.3339 8.36833 7.63238 8.66681 8.00057 8.66681C8.36876 8.66681 8.66724 8.36833 8.66724 8.00014C8.66724 7.63195 8.36876 7.33348 8.00057 7.33348Z"
                          ></path>
                          <path
                              fill={item.color1}
                              stroke={item.color1}
                              d="M3.33333 7.33348C2.96514 7.33348 2.66667 7.63195 2.66667 8.00014C2.66667 8.36833 2.96514 8.66681 3.33333 8.66681C3.70152 8.66681 4 8.36833 4 8.00014C4 7.63195 3.70152 7.33348 3.33333 7.33348Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </>

                  <div className="contact-top" style={{background:item.color1}}>
                    <div className="contact-header">
                      {/* <img className="contact-img" src={props.avatar} /> */}
                      <div className="contact-initials">
                        <div>
                          {data.first_name && data.first_name[0]}
                          {data.last_name && data.last_name[0]}
                        </div>
                      </div>
                      <div className="contact-name" style={{color:item.textColor}}>{`${data.first_name} ${data.last_name}`}</div>
                    </div>
                    <div className="button-box">
                      <button className="contact-button" onClick={contactVCF}>
                    <span className="contact-icon">
                      <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 4c.6 0 1 .4 1 1v14a1 1 0 1 1-2 0V5c0-.6.4-1 1-1Z"
                            fill="var(--plus-icon-color, currentColor)"
                        ></path>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4 12c0-.6.4-1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                            fill="var(--plus-icon-color, currentColor)"
                        ></path>
                      </svg>
                    </span>
                        <span>Add to contacts</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="container" >
                  <div className="contact-navbar" style={{background:item.color1 }}>
                    <div
                        onClick={() => handleNavBtnClick("1")}
                        style={activeNav === "1" ? activeNavCss : {background: "transparent", color: item.textColor}}

                        className={`${
                            activeNav === "1" ? "active-nav" : ""
                        } navbar-button`}
                    >
                      <span>Contact</span>
                    </div>
                    <div
                        onClick={() => handleNavBtnClick("2")}
                        style={activeNav === "2" ? activeNavCss : {background: "transparent",color: item.textColor}}

                        className={`${
                            activeNav === "2" ? "active-nav" : ""
                        } navbar-button`}
                    >
                      <span>Company</span>
                    </div>
                    {/*<div*/}
                    {/*    onClick={() => handleNavBtnClick("3")}*/}
                    {/*    className={`${*/}
                    {/*        activeNav === "3" ? "active-nav" : ""*/}
                    {/*    } navbar-button`}*/}
                    {/*>*/}
                    {/*    <span>Socials</span>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="container">
                  <div className="contact-info" style={{color:item.textColor2}}>
                    {activeNav === "1" && contactContent}
                    {activeNav === "2" && companyContent}
                    {/* {activeNav === "3" && socialsContent} */}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>)
        }

      })}

    </>
  );
};

export default UserPageContact;
