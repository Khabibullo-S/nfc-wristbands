import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {
  ApartmentOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { message } from "antd";
import { registration } from "../http/userAPI";

function Registration(props) {
  const [messageApi, contextHolder] = message.useMessage();

  const [regData, setRegData] = useState([]);
  const [invalidConfirm, setInvalidConfirm] = useState("");
  let sendData = {
    username: regData.username,
    email: regData.email ? regData.email : "",
    password: regData.password,
    first_name: regData.first_name ? regData.first_name : "",
    last_name: regData.last_name ? regData.last_name : "",
    phone: regData.phone ? regData.phone : null,
    birthday: regData.birthday ? regData.birthday : null,
    theme: null,
    created_by_id: null,
    work_info: {
      org: regData.work_info ? regData.work_info.org : "",
      role: regData.work_info ? regData.work_info.role : "",
    },
    address: {
      city: regData.address ? regData.address.city : "",
      region: regData.address ? regData.address.region : "",
      country: regData.address ? regData.address.country : "",
      street: regData.address ? regData.address.street : "",
    },
  };

  const click = async () => {
    if (
      sendData.password === "" ||
      sendData.password === null ||
      sendData.password === undefined
    ) {
      messageApi.open({
        type: "error",
        content: "Password",
      });
    } else if (
      sendData.username === "" ||
      sendData.username === null ||
      sendData.username === undefined
    ) {
      messageApi.open({
        type: "error",
        content: "Username",
      });
    } else if (sendData.first_name === "") {
      messageApi.open({
        type: "error",
        content: "first_name",
      });
    } else if (sendData.last_name === "") {
      messageApi.open({
        type: "error",
        content: "last_name",
      });
    } else if (sendData.phone === "" || sendData.phone === null) {
      messageApi.open({
        type: "error",
        content: "Phone",
      });
    } else {
      try {
        await registration(sendData);
      } catch (e) {
        alert(e);
      }
    }
  };

  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const nextBtn = () => {
    setPage1(false);
    setPage2(true);
  };
  const backBtn = () => {
    setPage1(true);
    setPage2(false);
  };

  console.log(regData);

  return (
    <div>
      {contextHolder}
      <Container>
        <div className="registration-container">
          <div className="reg-title">Sign Up</div>
          {page1 && (
            <div className={"indexReg"}>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <MailOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      type={"email"}
                      placeholder={`Email`}
                      aria-label={`Email`}
                      aria-describedby={`Email`}
                      value={regData.email}
                      onChange={(e) => {
                        setRegData({ ...regData, email: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <UserOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Username`}
                      aria-label={`Username`}
                      aria-describedby={`Username`}
                      value={regData.username}
                      onChange={(e) => {
                        setRegData({ ...regData, username: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <LockOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      type={"password"}
                      placeholder={`Password`}
                      aria-label={`Password`}
                      aria-describedby={`Password`}
                      value={regData.password}
                      onChange={(e) => {
                        setRegData({ ...regData, password: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <UserOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`First name`}
                      aria-label={`First name`}
                      aria-describedby={`First name`}
                      value={regData.first_name}
                      onChange={(e) => {
                        setRegData({ ...regData, first_name: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <UserOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Last name`}
                      aria-label={`Last name`}
                      aria-describedby={`Last name`}
                      value={regData.last_name}
                      onChange={(e) => {
                        setRegData({ ...regData, last_name: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <PhoneOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      type={"tel"}
                      placeholder={`Phone number`}
                      aria-label={`Phone number`}
                      aria-describedby={`Phone number`}
                      value={regData.phone}
                      onChange={(e) => {
                        setRegData({ ...regData, phone: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <CalendarOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      placeholder={`Birthday`}
                      aria-label={`Birthday`}
                      aria-describedby={`Birthday`}
                      value={regData.birthday}
                      onChange={(e) => {
                        setRegData({ ...regData, birthday: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <div className={"backBox"}>
                <button className={"backBtn"} onClick={nextBtn}>
                  Next
                </button>
                <div className="backBtnPage">
                  <div
                    style={{
                      background: "#494949",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  ></div>
                  <div
                    style={{
                      background: "#D9D9D9",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  ></div>
                </div>
              </div>
              <div className="signUpBottom">
                <span style={{ color: "#7B7777" }}>
                  Already have an account?{" "}
                  <Link to={LOGIN_ROUTE} style={{ color: "black" }}>
                    Sign In
                  </Link>
                </span>
              </div>{" "}
            </div>
          )}
          {page2 && (
            <div className={"indexReg"}>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <ApartmentOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Organization`}
                      aria-label={`Organization`}
                      aria-describedby={`Organization`}
                      onChange={(e) => {
                        setRegData({
                          ...regData,
                          work_info: {
                            ...regData.work_info,
                            org: e.target.value,
                          },
                        });
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <UserOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Role`}
                      aria-label={`Role`}
                      aria-describedby={`Role`}
                      onChange={(e) => {
                        setRegData({
                          ...regData,
                          work_info: {
                            ...regData.work_info,
                            role: e.target.value,
                          },
                        });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <EnvironmentOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Country`}
                      aria-label={`Country`}
                      aria-describedby={`Country`}
                      onChange={(e) => {
                        setRegData({
                          ...regData,
                          address: {
                            ...regData.address,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <EnvironmentOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`City`}
                      aria-label={`City`}
                      aria-describedby={`City`}
                      onChange={(e) => {
                        setRegData({
                          ...regData,
                          address: { ...regData.address, city: e.target.value },
                        });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <EnvironmentOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Region`}
                      aria-label={`Region`}
                      aria-describedby={`Region`}
                      onChange={(e) => {
                        setRegData({
                          ...regData,
                          address: {
                            ...regData.address,
                            region: e.target.value,
                          },
                        });
                      }}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3" style={{ height: "55px" }}>
                    <InputGroup.Text id="basic-addon1">
                      <EnvironmentOutlined />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder={`Street`}
                      aria-label={`Street`}
                      aria-describedby={`Street`}
                      onChange={(e) => {
                        setRegData({
                          ...regData,
                          address: {
                            ...regData.address,
                            street: e.target.value,
                          },
                        });
                      }}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <div className={"backBox"}>
                <button className={"backBtn"} onClick={backBtn}>
                  Back
                </button>
                <div className="backBtnPage">
                  <div
                    style={{
                      background: "#D9D9D9",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  ></div>
                  <div
                    style={{
                      background: "#494949",
                      filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    }}
                  ></div>
                </div>
              </div>
              <div className="regBtn">
                <button className="btnSignUp" onClick={click}>
                  Sign Up
                </button>
              </div>
              <div className="signUpBottom">
                <span style={{ color: "#7B7777" }}>
                  Already have an account?{" "}
                  <Link to={LOGIN_ROUTE} style={{ color: "black" }}>
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Registration;
