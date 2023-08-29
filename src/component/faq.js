import React, { useState, useRef, useEffect } from "react";
import "../../src/assets/css/newHome.css";

const Faq = (props) => {
  const { question, answer } = { ...props.faq };
  const [showAnswer, setShowAnswer] = useState(false);
  const answerRef = useRef(null);

  const handleClick = () => {
    setShowAnswer(!showAnswer);
  };

  useEffect(() => {
    if (answerRef.current) {
      answerRef.current.style.maxHeight = showAnswer
        ? `${answerRef.current.scrollHeight}px`
        : "0";
    }
  }, [showAnswer]);

  return (
    <>
      <div
        className={`faq ${props.className}`}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="faq-top">
          <div className="faq-question">{question}</div>
          <div className="faq-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke='var(--token-c14831ff-cc47-4731-9a6e-57f671335b44, rgb(119, 85, 204)) /* {"name":"Primary / 100%"} */'
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "100%",
                cursor: "auto",
                height: "100%",
                rotate: showAnswer ? "90deg" : "0deg",
                overflow: "hidden",
                transition: "0.5s",
              }}
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
        <div
          ref={answerRef}
          className={`faq-answer-container`}
          style={{
            maxHeight: "0",
            overflow: "hidden",
            transition: "max-height 0.5s ease-in-out",
          }}
        >
          <div className="faq-answer third-color-font" size="txtRubikRegular16">
            {answer}
          </div>
        </div>
      </div>
      {/* <div
        id={props.id}
        // style={{ cursor: `${showAnswer ? "zoom-out" : "zoom-in"}` }}
        style={{ cursor: "pointer" }}
      >
        {/* deleted: sm:flex-col 
        {/* flex  flex-row gap-8 items-center justify-center  sm:px-5 rounded-[28px] w-full 
        <div className="question-box">
          <div
            /* flex-1 text-base text-black-900 tracking-[0.16px] w-auto 
            className="question"
            size="txtRubikRegular16"
          >
            {question}
          </div>
          <div
            className="answer-icon"
            style={{
              rotate: showAnswer ? "-90deg" : "90deg",
              overflow: "hidden",
              transition: "0.5s",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 20 20"
              id="chevron"
            >
              <path
                d="M11 10 8.698 7.494a.512.512 0 0 1 0-.718.5.5 0 0 1 .71 0l2.807 2.864a.51.51 0 0 1 0 .717l-2.807 2.864a.498.498 0 0 1-.71 0 .51.51 0 0 1 0-.717L11 10zM10 .4a9.6 9.6 0 0 1 9.6 9.6c0 5.303-4.298 9.6-9.6 9.6S.4 15.303.4 10A9.6 9.6 0 0 1 10 .4zm0 17.954a8.354 8.354 0 1 0 0-16.709 8.354 8.354 0 0 0 0 16.709z"
                fill="#2478F5"
              ></path>
            </svg>
          </div>
        </div>
        {/* The answer container 
        <div
          className={`answer-container ${showAnswer ? "show" : ""}`}
          style={{
            maxHeight: showAnswer ? "1000px" : "0",
            overflow: "hidden",
            transition: "max-height 0.5s ease-in-out",
          }}
        >
          <div
            /* m-5 flex-1 text-base text-black-900 tracking-[0.16px] w-auto 
            className="answer"
            size="txtRubikRegular16"
          >
            {answer}
          </div>
        </div> 
      </div> */}
    </>
  );
};

Faq.defaultProps = {};

export default Faq;
