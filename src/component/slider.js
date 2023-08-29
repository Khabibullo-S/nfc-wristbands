import React, { useEffect, useState } from "react";
import "../../src/assets/css/slider.css";
import { sliderLangs } from "../utils/multiLang";

const Slider = (props) => {
  const pageLang = props.pageLang;
  const slides = (
    <>
      <div class="slide">
        <img src={require("../assets/testImg/partnyor1.png")} alt="" />
      </div>
      <div class="slide">
        <img src={require("../assets/testImg/partnyor2.png")} alt="" />
      </div>
      <div class="slide">
        <img src={require("../assets/testImg/partnyor3.png")} alt="" />
      </div>
      <div class="slide">
        <img src={require("../assets/testImg/partnyor4.png")} alt="" />
      </div>
      <div class="slide">
        <img src={require("../assets/testImg/partnyor5.png")} alt="" />
      </div>
    </>
  );
  return (
    <>
      <div className="partners">
        <h1>{sliderLangs.trustedBy[`${pageLang}`]}</h1>
        <div className="clients-container">
          <section className="clients">
            <div className="slider">
              <div className="slider-track">
                {slides}
                {slides}
                {slides}
                {slides}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

Slider.defaultProps = {};

export default Slider;
