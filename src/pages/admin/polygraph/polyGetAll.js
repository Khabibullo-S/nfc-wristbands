import React, { useContext, useEffect, useState } from "react";
import { $authHost } from "../../../http";
import { Container, Table } from "react-bootstrap";
import { Button, message, Modal } from "antd";
import QRCode from "react-qr-code";

const PolyGetAll = () => {
  const [dataOrder, setDataOrder] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [statusID, setStatusID] = useState({ userID: 0, orderID: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (userID, orderID) => {
    setStatusID({ userID: userID, orderID: orderID });
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getOrderList = async () => {
    try {
      const res = await $authHost.get("api/v1/orders/");
      setDataOrder(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const downloadQR = (username) => {
    const qrCode = document.querySelector(`#qr-${username} svg`);
    console.log(qrCode)
    if (qrCode) {
      const svgData = new XMLSerializer().serializeToString(qrCode);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = svgUrl;
      link.download = `qrcode-${username}.svg`;
      link.click();
    } else {
      messageApi.open({
        type: "error",
        content: "QR code yuklanishda xatolik yuzaga keldi",
      });
    }
  };

  const changeStatus = async () => {
    const selected = document.getElementById("status");
    console.log(selected.value);
    try {
      const res = await $authHost.put(
        "api/v1/orders/" + statusID.orderID + "/",
        { user_id: statusID.userID, status: selected.value }
      );
      messageApi.open({
        type: "success",
        content: "Status",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      messageApi.open({
        type: "success",
        content: "error",
      });
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  console.log(dataOrder);
  return (
    <div >
      <h1>Orders</h1>
      {contextHolder}

        <Table  responsive  hover size="sm" style={{textAlign:"center"}}>
          <thead>
            <th>IDUser</th>
            <th>Username</th>
            <th>created</th>
            <th>QR</th>
            <th>Status</th>
          </thead>
          <tbody >
            {dataOrder.map((item) => {
              return (
                <>
                  {item.user ? (
                    <tr key={item.user.id} >
                      <td >{item.user.id}</td>
                      <td>{item.user.username}</td>
                      <td>{item.updated_at.substring(0, 10)}</td>
                      <td>
                        <div id={"qr-" + item.user.username}>
                          <QRCode
                              level={'L'}
                              size={50}
                            value={
                              window.location.protocol +
                              "//" +
                              window.location.hostname +
                              "/" +
                              item.user.id
                            }
                          />
                        </div>
                        <Button onClick={() => downloadQR(item.user.username)} style={{marginTop:"10px"}}>
                          Download
                        </Button>
                      </td>
                      <td>
                        {item.status}<br/>
                        <Button
                            type="primary"
                            onClick={() => showModal(item.user.id, item.id)}
                            style={{marginTop:"10px"}}
                        >
                          change status
                        </Button>
                      </td>

                    </tr>
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </tbody>
        </Table>

        <Modal title="change status" open={isModalOpen} onCancel={handleCancel}>
          <select id={"status"}>
            <option value="NEW">NEW</option>
            <option value="IN PROCESS">In Progress</option>
            <option value="READY">Ready</option>
          </select>
          <button onClick={changeStatus}>send</button>
        </Modal>
    </div>
  );
};

export default PolyGetAll;
