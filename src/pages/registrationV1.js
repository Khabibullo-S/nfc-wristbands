import React, {useContext, useState} from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {message} from "antd";

import {
    Container,
    Form,
    Card,
    Button,
    Row,
    Col,
    FormGroup,
} from "react-bootstrap";
import {login, registration} from "../http/userAPI";
import "../assets/css/registration.css";

const RegistrationV1 = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [regData, setRegData] = useState([]);
    const [invalidConfirm, setInvalidConfirm] = useState("");
    let sendData = {
        username: regData.username,
        email:regData.email ? regData.email : '',
        password:regData.password,
        first_name: regData.first_name ? regData.first_name : '',
        last_name:regData.last_name ? regData.last_name : '',
        phone:regData.phone ? regData.phone : null,
        birthday:regData.birthday ? regData.birthday : null,
        theme:null,
        created_by_id:null,
        work_info: {
            org: regData.work_info ? regData.work_info.org : '',
            role: regData.work_info ? regData.work_info.role : ''
        } ,
        address:{
            city:regData.address ? regData.address.city : '',
            region:regData.address ? regData.address.region : '',
            country:regData.address ? regData.address.country : '',
            street:regData.address ? regData.address.street : ''
        }
    }

    const click = async () => {
        if (sendData.password === '' || sendData.password === null || sendData.password === undefined){
            messageApi.open({
                type: 'error',
                content: 'Password',
            })
        }else if (sendData.username === '' || sendData.username === null || sendData.username === undefined){
            messageApi.open({
                type: 'error',
                content: 'Username',
            })
        }else if (sendData.first_name === ''){
            messageApi.open({
                type: 'error',
                content: 'first_name',
            })
        }else if (sendData.last_name === ''){
            messageApi.open({
                type: 'error',
                content: 'last_name',
            })
        }else if (sendData.phone === '' || sendData.phone ===null) {
            messageApi.open({
                type: 'error',
                content: 'Phone',
            })
        }else {
            try {
                await registration(sendData);
            } catch (e) {
                alert(e);
            }
        }



    };


    return (
        <div className="registration">
            {contextHolder}

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
                                        setRegData({...regData, email: e.target.value});
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
                                        setRegData({...regData, username: e.target.value});
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className="password-row">
                        <div>
                            {invalidConfirm ? (
                                <Row>
                                    <Col style={{color: "red"}}>INVALID CONFIRMATION</Col>
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
                                        setRegData({...regData, password: e.target.value});
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
                                        setRegData({...regData, first_name: e.target.value});
                                    }}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            {/* LAST NAME */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label=" last_name"
                                className="mb-4"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="last_name"
                                    value={regData.last_name}
                                    onChange={(e) => {
                                        setRegData({...regData, last_name: e.target.value});
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
                                        setRegData({...regData, phone: e.target.value});
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
                                        setRegData({...regData, birthday: e.target.value});
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
                                label="organization"
                                className="mb-4"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="hello from work info"
                                    onChange={(e) => {
                                        setRegData({...regData , work_info:{...regData.work_info , org:e.target.value}});
                                    }}
                                />
                            </FloatingLabel><FloatingLabel
                                controlId="floatingInput"
                                label="Role"
                                className="mb-4"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="hello from work info"
                                    onChange={(e) => {
                                        setRegData({...regData , work_info:{...regData.work_info , role:e.target.value}});
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
                                label="City"
                                className="mb-4"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="hello from address"
                                    // value={regData.address.city}
                                    onChange={(e) => {
                                        setRegData({...regData , address:{...regData.address , city:e.target.value}});
                                    }}
                                />
                            </FloatingLabel>

                          <FloatingLabel
                              controlId="floatingInput"
                              label="Street"
                              className="mb-4"
                          >
                            <Form.Control
                                type="text"
                                placeholder="hello from address"
                                // value={regData.address.street}
                                onChange={(e) => {
                                  setRegData({...regData , address:{...regData.address ,street:e.target.value}});
                                }}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                              controlId="floatingInput"
                              label="Region"
                              className="mb-4"
                          >
                            <Form.Control
                                type="text"
                                placeholder="hello from address"
                                // value={regData.address.region}
                                onChange={(e) => {
                                  setRegData({...regData , address:{...regData.address,region:e.target.value}});
                                }}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                              controlId="floatingInput"
                              label="Country"
                              className="mb-4"
                          >
                            <Form.Control
                                type="text"
                                placeholder="hello from address"
                                // value={regData.address.country}
                                onChange={(e) => {
                                  setRegData({...regData , address:{...regData.address,country:e.target.value}});
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

export default RegistrationV1;
