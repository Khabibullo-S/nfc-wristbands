import React, { useContext, useEffect, useState } from "react";
import { login } from "../http/userAPI";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  PROFILE_USER,
  REGISTRATION_ROUTE,
} from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {$authHost, $host} from "../http";
import { observer } from "mobx-react-lite";
import { useUser } from "../constructor/UserContext";
import CryptoJS from "crypto-js";
import { message,Modal  } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Reset_Password_Modal from "../component/Modal/reset_Password_Modal";

const Login = () => {
  const [username, setUsername] = useState("");
  const [resetUser, setResetUser] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };




  const click = async () => {
    if (!username) {
      messageApi.open({
        type: "error",
        content: "username is required",
      });
    } else if (!password) {
      messageApi.open({
        type: "error",
        content: "password is required",
      });
    } else {
      try {
        const { data } = await $host.post("api/v1/login", {
          username,
          password,
        });
        localStorage.setItem("token", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);
        localStorage.setItem("uuid", data.user.id);
        const encryptedUserData = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          "nfcGlobal"
        ).toString();
        console.log(data.user.type)
        localStorage.setItem("user", encryptedUserData);
        if (data.user.type === 'POLYGRAPHY'){
          window.location.assign("/cabinet/getOrders");
        }else {
           window.location.assign("/cabinet/Profile");
        }

      } catch (e) {
        messageApi.open({
          type: "error",
          content: "username or password",
        });
      }
    }
  };


  const resetPassword = async ()=>{
    console.log(resetUser)
      if (resetUser){
          try {
            const res = await $host.post("api/v2/auth/reset-password/"+resetUser+"/")
            console.log(res)
          } catch (e){
console.log(e)
          }

      }else {
        console.log(false)
      }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {contextHolder}
      <Row className={"sign-row"}>
        <div className="signIn-title">Sign In</div>
        <Col>
          <InputGroup className="mb-3" style={{ height: "55px" }}>
            <InputGroup.Text id="basic-addon1">
              <UserOutlined />
            </InputGroup.Text>
            <Form.Control
              placeholder={`Username:${username}`}
              aria-label={`Username:${username}`}
              aria-describedby={`Username:${username}`}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3" style={{ height: "55px" }}>
            <InputGroup.Text id="basic-addon1">
              <LockOutlined />
            </InputGroup.Text>
            <Form.Control
              type={"password"}
              placeholder={`Password`}
              aria-label={`Password`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col>
          <button className={"signInBtn"} onClick={click}>
            Sign In
          </button>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <span style={{ color: "#7B7777" }}>
            {" "}
            Don’t have an account?{" "}
            <Link to={REGISTRATION_ROUTE} style={{ color: "black" }}>
              Sign up
            </Link>
          </span>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>


          <Modal title="Reset Password" open={isModalOpen}  onCancel={handleCancel}>

            <InputGroup className="mb-3" style={{ height: "55px" }}>
              <InputGroup.Text id="basic-addon1">
                <UserOutlined />
              </InputGroup.Text>
              <Form.Control
                  placeholder={`Username`}
                  aria-label={`Username`}
                  aria-describedby={`Username`}
                  onChange={(e) => setResetUser(e.target.value)}
              />
            </InputGroup>
            <Button onClick={resetPassword}>Send</Button>
          </Modal>

        </Col>
      </Row>
    </div>
  );
};

export default Login;
