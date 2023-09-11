import React, { useState, useEffect } from "react";
import { $authHost, $host } from "../../../http";
import { Button } from "react-bootstrap";
import CryptoJS from "crypto-js";
import { Steps, Modal, Input, message } from "antd";
import "../../../assets/css/adminDash.css";

const UserOrder = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateIsModalOpen, setUpdateIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [statusNum, setStatusNum] = useState(0);
  const [userDataLogin, setUserDataLogin] = useState(null);

  useEffect(() => {
    const decryptedUserData = CryptoJS.AES.decrypt(
      localStorage.getItem("user"),
      "nfcGlobal"
    ).toString(CryptoJS.enc.Utf8);

    const userData = JSON.parse(decryptedUserData);
    setUserDataLogin(userData);

    checkStatus(userData);
  }, []);

  const checkStatus = (userData) => {
    if (userData?.user?.orders) {
      const orderStatus = userData.user.orders[0]?.status || "NO";

      switch (orderStatus) {
        case "NEW":
          setStatusNum(1);
          break;
        case "IN PROCESS":
          setStatusNum(2);
          break;
        case "READY":
          setStatusNum(3);
          break;
        default:
          setStatusNum(0);
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const updateShowModal = () => {
    setUpdateIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const updateHandleOk = () => {
    setUpdateIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateHandleCancel = () => {
    setUpdateIsModalOpen(false);
  };

  const confirmBtn = async () => {
    if (!password) {
      messageApi.open({
        type: "error",
        content: "Password is required",
      });
    } else {
      try {
        await $authHost.post("api/v1/orders/", {
          user_id: userDataLogin.user.id,
        });
        const { data } = await $host.post("api/v1/login", {
          username: userDataLogin.user.username,
          password: password,
        });
        console.log(data);
        const encryptedUserData = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          "nfcGlobal"
        ).toString();

        localStorage.setItem("user", encryptedUserData);

        setUserDataLogin(data); // Update user data state
        messageApi.open({
          type: "success",
          content: "Success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (e) {
        messageApi.open({
          type: "error",
          content: e.response.data.message,
        });
      }
    }
  };

  const updateBtn = async () => {
    if (!password) {
      messageApi.open({
        type: "error",
        content: "Password is required",
      });
    } else {
      try {
        const { data } = await $host.post("api/v1/login", {
          username: userDataLogin.user.username,
          password: password,
        });

        const encryptedUserData = CryptoJS.AES.encrypt(
          JSON.stringify(data),
          "nfcGlobal"
        ).toString();

        localStorage.setItem("user", encryptedUserData);

        messageApi.open({
          type: "success",
          content: "Success",
        });

        setUserDataLogin(data); // Update user data state

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (e) {
        messageApi.open({
          type: "error",
          content: "Error",
        });
      }
    }
  };
  
  return (
    <div className="user-order-container">
      {contextHolder}
      <h1>Orders</h1>
      <div className="user__order-steps">
        <Steps
          current={statusNum}
          items={[
            {
              title: "NO",
            },
            {
              title: "NEW",
            },
            {
              title: "In Progress",
            },
            {
              title: "Ready",
            },
          ]}
        />

        <Modal
          title="Confirm"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={confirmBtn}>Confirm</Button>
        </Modal>
        <Modal
          title="Update"
          visible={updateIsModalOpen}
          onOk={updateHandleOk}
          onCancel={updateHandleCancel}
        >
          <Input
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={updateBtn}>Confirm</Button>
        </Modal>
      </div>
      {userDataLogin?.user?.orders.length === 0 ? (
        <div className="btnUserOrder">
          <Button onClick={showModal}>Create</Button>
        </div>
      ) : (
        <div className="btnUserOrder">
          <Button onClick={updateShowModal}>Update</Button>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
