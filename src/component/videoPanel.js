import React from "react";
import "../../src/assets/css/videoPanel.css";
import { videoPanelLangs } from "../utils/multiLang";

const VideoPanel = (props) => {
  const pageLang = props.pageLang;
  return (
    <>
      {/* flex flex-col items-center justify-center sm:m-[] sm:mb-[] sm:ml-[] sm:mr-[] sm:mt-[] sm:p-[] pt-16 sm:px-5 w-full */}
      <div className="videoPanel">
        {/* bg-gray-100 flex flex-col h-[600px] md:h-auto items-center justify-center max-w-[1080px] p-7 sm:rounded-[64px] rounded-[80px] w-full */}
        <div className="video-container">
          {/* flex flex-col gap-12 h-full items-start sm:items-start justify-center w-full */}
          <div className="video-box">
            {/* flex flex-col items-start justify-start w-full */}
            <div className="title-container">
              <div
                //   leading-[44.00px] max-w-[498px] md:max-w-full text-4xl sm:text-[32px] md:text-[34px] text-black-900
                className="video-title"
                size="txtRubikSemiBold36"
              >
                {videoPanelLangs.connect[`${pageLang}`]}
              </div>
            </div>
            {/* flex sm:flex-col flex-row gap-8 items-center justify-start w-auto sm:w-full */}
            <div className="v-btns-container">
              {/* bg-light_green-A200 cursor-pointer font-inter font-semibold min-w-[157px] py-[15px] rounded-[28px] text-black-900 text-center text-xl */}
              <button className="v-start-btn">
                {videoPanelLangs.startBtn[`${pageLang}`]}
              </button>
              <button className="watch-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 20 20"
                  id="chevron"
                >
                  <path
                    d="M11 10 8.698 7.494a.512.512 0 0 1 0-.718.5.5 0 0 1 .71 0l2.807 2.864a.51.51 0 0 1 0 .717l-2.807 2.864a.498.498 0 0 1-.71 0 .51.51 0 0 1 0-.717L11 10zM10 .4a9.6 9.6 0 0 1 9.6 9.6c0 5.303-4.298 9.6-9.6 9.6S.4 15.303.4 10A9.6 9.6 0 0 1 10 .4zm0 17.954a8.354 8.354 0 1 0 0-16.709 8.354 8.354 0 0 0 0 16.709z"
                    fill="#e8e8e8"
                    stroke="#e8e8e8"
                    strokeWidth="1"
                  ></path>
                </svg>
                {/* font-inter font-semibold text-black-900 text-left text-xl */}
                <div className="watch-btn-text">
                  {videoPanelLangs.watchBtn[`${pageLang}`]}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

VideoPanel.defaultProps = {};

export default VideoPanel;
