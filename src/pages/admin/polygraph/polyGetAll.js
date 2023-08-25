import React, {useContext, useEffect, useState} from 'react';
import {$authHost} from "../../../http";
import {Container, Table} from "react-bootstrap";
import {Button, message, Modal} from 'antd';
import QRCode from 'react-qr-code';
import { saveAs } from 'file-saver';

const PolyGetAll = () => {

    const [dataOrder, setDataOrder] = useState([])
    const [messageApi, contextHolder] = message.useMessage();
    const [statusID , setStatusID] = useState({userID:0 , orderID:0})
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (userID , orderID) => {
        setStatusID({userID: userID , orderID: orderID})
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const getOrderList = async () => {
        try {
            const res = await $authHost.get('api/v1/orders/');
            setDataOrder(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const downloadQR = (username) => {
        const qrCode = document.querySelector(`#qr-${username} svg`); // Query SVG element
        if (qrCode) {
            const svgData = new XMLSerializer().serializeToString(qrCode); // Serialize SVG to XML
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' }); // Create Blob from XML data
            saveAs(blob, `qrcode-${username}.svg`); // Save Blob as SVG file
        } else {
            messageApi.open({
                type: 'error',
                content: 'QR code yuklanishda xatolik yuzaga keldi',
            });
        }
    };


    const changeStatus = async ()=>{
        const selected = document.getElementById('status')
        console.log(selected.value)
        try {
            const res = await $authHost.put('api/v1/orders/'+statusID.orderID+"/",{user_id:statusID.userID, status:selected.value});
            messageApi.open({
                type: 'success',
                content: 'Status',
            })
            setTimeout(()=>{
                window.location.reload()
            },2000)

        }catch (e) {
            messageApi.open({
                type: 'success',
                content: "error",
            })
        }
    }



    useEffect(() => {
        getOrderList()
    }, [])

console.log(dataOrder)
    return (
        <>
            {contextHolder}
            <Container>


            <Table>
                <thead>
                <th>
                    IDUser
                </th>
                <th>
                    Username
                </th>
                <th>created</th>
                <th>QR</th>
                <th>Status</th>
                <th>change Status</th>
                </thead>
                <tbody>
                {dataOrder.map((item) => {
                     return <>
                         {item.user ? <tr key={item.user.id}>
                             <td>{item.user.id}</td>
                             <td>{item.user.username}</td>
                             <td>{item.updated_at.substring(0, 10)}</td>
                             <td>
                                 <div id={"qr-" + item.user.username}>
                                     <QRCode
                                         level={'L'}
                                         size={100}
                                         value={window.location.protocol + "//" + window.location.hostname + "/" + item.user.id}/>
                                 </div>
                                 <Button onClick={() => downloadQR(item.user.username)}>
                                     Download
                                 </Button>
                             </td>
                             <td>
                                 {item.status}

                             </td>
                             <td>
                                 <Button type="primary" onClick={()=>showModal(item.user.id , item.id)}>
                                     change status
                                 </Button>
                             </td>

                         </tr> : <></>}


                    </>
                })}

                </tbody>
            </Table>

                <Modal title="change status" open={isModalOpen} onCancel={handleCancel}>
                    <select id={'status'}>
                        <option value="NEW">NEW</option>
                        <option value="IN PROCESS">In Progress</option>
                        <option value="READY">Ready</option>
                    </select>
                    <button onClick={changeStatus}>send</button>
                </Modal>
            </Container>

        </>
    );
};

export default PolyGetAll;
