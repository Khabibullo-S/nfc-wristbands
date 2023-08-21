import React, {useEffect} from 'react';
import CryptoJS from 'crypto-js';
import {Statistic,Col,Row,Button} from "antd";
import {AuditOutlined, UserOutlined} from "@ant-design/icons";
import '../../../assets/css/adminDash.css'
import { Pie } from '@ant-design/plots';

const Statistics = () => {
    const decryptedUserData = CryptoJS.AES.decrypt(
        localStorage.getItem('user'),
        'nfcGlobal'
    ).toString(CryptoJS.enc.Utf8);
    const userDataLogin = JSON.parse(decryptedUserData);
    console.log(userDataLogin.data)


    const data = [
        {
            type: 'New',
            value: userDataLogin.data.order.new,
        },
        {
            type: 'Process',
            value: userDataLogin.data.order.process,
        },
        {
            type: 'ready',
            value: userDataLogin.data.order.ready,
        }

    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <>
           <div className="row-stats">
               <div className="stats-item">
                   <div className="stats-icon">
                       <UserOutlined />
                   </div>
                   <div className="stats-num">
                       {userDataLogin.data.Num_Users}
                       <p>total users</p>
                   </div>
               </div>
               <div className="stats-item">
                   <div className="stats-icon">
                       <AuditOutlined />
                   </div>
                   <div className="stats-num">
                       {userDataLogin.data.order.tot}
                       <p>total order</p>
                   </div>
               </div>
           </div>

            <Pie {...config} />
        </>
    );
};

export default Statistics;
