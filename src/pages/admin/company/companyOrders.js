import React, { useEffect, useState } from "react";
import { $authHost } from "../../../http";
import { message } from "antd";
import { Err } from "../../../component/err";
import { Button, Table } from "react-bootstrap";

const CompanyOrders = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [orderList, setOrderList] = useState([]);
  const [data, setData] = useState([]);
  const optionData = data.map((item) => {
    return <option value={item.id}>{item.username}</option>;
  });

  const getOrderList = async () => {
    try {
      const res = await $authHost.get("api/v1/orders/");
      return setOrderList(res.data);
    } catch (e) {
      messageApi.open({
        type: "error",
        content: e.message,
      });
    }
  };
  useEffect(() => {
    getOrderList();
    userList();
  }, []);

  const createBtn = async () => {
    const getSelect = document.getElementById("select");
    try {
      const res = await $authHost.post("api/v1/orders/", {
        user_id: getSelect.value,
      });
      messageApi.open({
        type: "success",
        content: "Buyurtma qabul qilindi",
      });
      return window.location.reload();
    } catch (e) {
      messageApi.open({
        type: "error",
        content: Err(e.response.status),
      });
    }
  };

  const userList = async () => {
    const res = await $authHost.get("api/v1/users/");
    setData(res.data);
  };
  return (
    <div className={"companyOrder"}>
      <h1>Orders</h1>
      {contextHolder}
      <div className="orderBtn">
        <select id="select">{optionData}</select>
        <Button onClick={createBtn}>create</Button>
      </div>

      <Table>
        <thead>
          <th>Username</th>
          <th>telephone</th>
          <th>status</th>
        </thead>
        <tbody>
          {orderList.map((item) => {
            return (
              <>
                <tr>
                  <td>{item.user.username}</td>
                  <td>{item.user.phone}</td>
                  <td>{item.status}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyOrders;
