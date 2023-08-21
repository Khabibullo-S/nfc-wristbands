import React, {useContext, useEffect, useState} from 'react';
import {login} from "../http/userAPI";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {$host} from "../http";
import {observer} from "mobx-react-lite";
import { useUser } from '../constructor/UserContext'
import CryptoJS from 'crypto-js';
import {message} from "antd";


const Login = () => {
    const user = useUser();
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const history = useNavigate();
    const click = async ()=>{
        if (!username){
            messageApi.open({
                type: 'error',
                content: 'username is required',
            });
        }else if(!password){
            messageApi.open({
                type: 'error',
                content: 'password is required',
            });
        }else {
            try {
                const { data } = await $host.post('api/v1/login', { username, password });
                localStorage.setItem('token', data.tokens.access);
                localStorage.setItem('refreshToken', data.tokens.refresh);
                localStorage.setItem('uuid', data.user.id);
                const encryptedUserData = CryptoJS.AES.encrypt(
                    JSON.stringify(data),
                    'nfcGlobal'
                ).toString();
                localStorage.setItem('user',encryptedUserData);
                if (data.user.type === "POLYGRAPHY"){
                    window.location.assign('cabinet/getOrders')
                }else { window.location.assign('cabinet/Profile')}

            }catch (e) {
                messageApi.open({
                    type: 'error',
                    content: 'username or password',
                });
            }
        }
    };

    return (
        <div style={{display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center", height:'100vh'}}>
            {contextHolder}
            <Row style={{display:"flex" , flexDirection:"column", width:'50%'}}>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label={`Username:${username}`}
                        className="mb-4"
                    >
                        <Form.Control
                            type="text"
                            placeholder={`Username:${username}`}
                            onChange={e=>setUsername(e.target.value)}
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel
                        controlId="floatingInput"
                        label={`Password`}
                        className="mb-4"
                    >
                        <Form.Control
                            type="text"
                            placeholder={`Password`}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </FloatingLabel>                </Col>
                <Col>
                    <Button onClick={click}>send</Button>
                </Col>
                <Col>
                    <Link to={REGISTRATION_ROUTE}>Registration</Link>
                </Col>
            </Row>

        </div>
    );
};

export default Login;
