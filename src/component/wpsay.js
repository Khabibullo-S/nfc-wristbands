import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/assets/css/wpsay.css";
import { wpsayLangs } from "../utils/multiLang";

const Wpsay = (props) => {
  const pageLang = props.pageLang;
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
  return (
    <>
      <div className="wpsay">
        <div className="wpsay-title">{wpsayLangs.wpsayHeader[pageLang]}</div>
        <Slider {...settings} id="slider">
          {wpsayLangs.reviews[pageLang].map((review) => (
            <div className="wpsay-item">
              <div className="wpsay-container">
                <h1>{wpsayLangs.review[pageLang]}</h1>
                <p>{review}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

Wpsay.defaultProps = {};

export default Wpsay;
