import React, { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  Container,
  Form,
  Card,
  Button,
  Row,
  Col,
  FormGroup,
} from "react-bootstrap";
import { login, registration } from "../http/userAPI";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/registration.css";

const Registration = () => {
  const { user } = useContext(Context);
  const history = useNavigate();
  const [regData, setRegData] = useState([
    {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      birthday: "",
      work_info: "",
      address: "",
    },
  ]);
  const [passwordInput, setPasswordInput] = useState("");
  const [invalidConfirm, setInvalidConfirm] = useState("");
  // console.log(regData);
  const click = async () => {
    try {
      await registration(
        regData.username,
        regData.email,
        regData.password,
        regData.first_name,
        regData.last_name,
        regData.phone,
        regData.birthday,
        regData.work_info,
        regData.address
      );
      history(LOGIN_ROUTE);
    } catch (e) {
      alert(e);
    }
  };
  const handlePasswordInput = (e) => {
    setRegData({ ...regData, password: e.target.value });
    setPasswordInput(e.target.value);
  };
  const handleConfirm = (value) => {
    setInvalidConfirm(value !== passwordInput);
    console.log(value);
    console.log(passwordInput);
  };

  return (
    <div className="registration">
      <Container className="registration-box">
        <Row>
          <Col className="mb-4">
            <div>Sign up</div>
          </Col>
        </Row>
        <Container>
          <Row>
            <Col>
              {/* EMAIL */}
              <FloatingLabel
                controlId="floatingInput"
                label="email address"
                className="mb-4"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={regData.email}
                  onChange={(e) => {
                    setRegData({ ...regData, email: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              {/* USERNAME */}
              <FloatingLabel
                controlId="floatingInput"
                label="username"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  value={regData.username}
                  onChange={(e) => {
                    setRegData({ ...regData, username: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row className="password-row">
            <div>
              {invalidConfirm ? (
                <Row>
                  <Col style={{ color: "red" }}>INVALID CONFIRMATION</Col>
                </Row>
              ) : (
                <></>
              )}
            </div>
            <Col>
              {/* PASSWORD */}
              <FloatingLabel
                controlId="floatingPassword"
                label="password"
                className="mb-4"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={regData.password}
                  onChange={(e) => {
                    handlePasswordInput(e);
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              {/* CONFIRM PASSWORD */}
              <FloatingLabel
                controlId="floatingPassword"
                label="confirm password"
                className="mb-4"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  // value={regData.password}
                  onChange={(e) => {
                    handleConfirm(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <div className="w-full flex items-center justify center mb-2">
                Personal details:
              </div>
            </Col>
          </Row>
          <Row className="names-row">
            <Col>
              {/* FIRST NAME */}
              <FloatingLabel
                controlId="floatingInput"
                label="first name"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Palonchi"
                  value={regData.first_name}
                  onChange={(e) => {
                    setRegData({ ...regData, first_name: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              {/* LAST NAME */}
              <FloatingLabel
                controlId="floatingInput"
                label="first name"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="Pismadonchiyev"
                  vvalue={regData.last_name}
                  onChange={(e) => {
                    setRegData({ ...regData, last_name: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* PHONE NUMBER */}
              <FloatingLabel
                controlId="floatingInput"
                label="phone number"
                className="mb-4" // label-separate-form
              >
                <Form.Control
                  type="tel"
                  placeholder="+99812345689"
                  value={regData.phone}
                  onChange={(e) => {
                    setRegData({ ...regData, phone: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col>
              {/* BIRTHDAY DATE */}
              <FloatingLabel
                controlId="floatingInput"
                label="birthday"
                className="mb-4"
              >
                <Form.Control
                  type="date"
                  placeholder="birthday"
                  value={regData.birthday}
                  onChange={(e) => {
                    setRegData({ ...regData, birthday: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* WORK INFO */}
              <FloatingLabel
                controlId="floatingInput"
                label="work info"
                className="mb-4"
              >
                <Form.Control
                  // as="textarea"
                  rows={3}
                  type="text"
                  placeholder="hello from work info"
                  style={{ height: "100px" }}
                  value={regData.work_info}
                  onChange={(e) => {
                    setRegData({ ...regData, work_info: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* ADDRESS */}
              <FloatingLabel
                controlId="floatingInput"
                label="address"
                className="mb-4"
              >
                <Form.Control
                  type="text"
                  placeholder="hello from address"
                  value={regData.address}
                  onChange={(e) => {
                    setRegData({ ...regData, address: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={click}>send</Button>
            </Col>
          </Row>
        </Container>

        {/* <input
          type="email"
          placeholder={"email"}
          value={regData.email}
          onChange={(e) => {
            setRegData({ ...regData, email: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder={"username"}
          value={regData.username}
          onChange={(e) => {
            setRegData({ ...regData, username: e.target.value });
          }}
        />
        <input type="password" placeholder={"password"} />
        <input
          type="text"
          placeholder={"first_name"}
          value={regData.first_name}
          onChange={(e) => {
            setRegData({ ...regData, first_name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder={"last_name"}
          value={regData.last_name}
          onChange={(e) => {
            setRegData({ ...regData, last_name: e.target.value });
          }}
        />
        <input
          type="tel"
          placeholder={"phone"}
          value={regData.phone}
          onChange={(e) => {
            setRegData({ ...regData, phone: e.target.value });
          }}
        />
        <input
          type="date"
          placeholder={"birthday"}
          value={regData.birthday}
          onChange={(e) => {
            setRegData({ ...regData, birthday: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder={"work_info"}
          value={regData.work_info}
          onChange={(e) => {
            setRegData({ ...regData, work_info: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder={"address"}
          value={regData.address}
          onChange={(e) => {
            setRegData({ ...regData, address: e.target.value });
          }}
        /> */}
      </Container>
    </div>
  );
};

export default Registration;
