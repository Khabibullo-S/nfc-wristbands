import React, { useEffect, useState } from "react";
import { message } from "antd";
import { $authHost } from "../../../http";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../../../assets/css/userProfile.css";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [sendProf, setSendProf] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    birthday: "",
    work_info: {
      org: "",
      role: "",
    },
    address: {
      city: "",
      street: "",
      region: "",
      country: "",
    },
    linkedin: "",
  });

  let dataIndex = {
    username: sendProf.username ? sendProf.username : currentUser.username,
    email: sendProf.email ? sendProf.email : currentUser.email,
    password: sendProf.password,
    first_name: sendProf.first_name
      ? sendProf.first_name
      : currentUser.first_name,
    last_name: sendProf.last_name ? sendProf.last_name : currentUser.last_name,
    phone: sendProf.phone ? sendProf.phone : currentUser.phone,
    birthday: sendProf.birthday ? sendProf.birthday : currentUser.birthday,
    created_by_id: currentUser.created_by_id,
    theme: currentUser.theme,
    linkedin: sendProf.linkedin,
    work_info: {
      org: sendProf.work_info
        ? sendProf.work_info.org
        : currentUser.work_info.org,
      role: sendProf.work_info
        ? sendProf.work_info.role
        : currentUser.work_info.role,
    },
    address: {
      city: sendProf.address ? sendProf.address.city : currentUser.address.city,
      street: sendProf.address
        ? sendProf.address.street
        : currentUser.address.street,
      region: sendProf.address
        ? sendProf.address.region
        : currentUser.address.region,
      country: sendProf.address
        ? sendProf.address.country
        : currentUser.address.country,
    },
  };

  useEffect(() => {
    const getData = async () => {
      const res = await $authHost.get(
        "api/v1/users/" + localStorage.getItem("uuid")
      );
      setCurrentUser(res.data);
    };
    getData();
  }, []);

  const handleSend = async () => {
    if (sendProf.password === "") {
      messageApi.open({
        type: "error",
        content: "password",
      });
    } else {
      try {
        const res = await $authHost.patch(
          "api/v1/users/" + localStorage.getItem("uuid") + "/",
          dataIndex
        );
        messageApi.open({
          type: "success",
          content: res.data.username + " update",
        });
        setTimeout(() => {
          return window.location.reload();
        }, 3000);
      } catch (e) {
        messageApi.open({
          type: "error",
          content: e.message,
        });
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const savePhotoToLocalStorage = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);
      fileReader.onload = (event) => {
        const dataURL = event.target.result;
        localStorage.setItem("selectedPhoto", dataURL);
        alert("Фото успешно добавлено.");
      };
    } else {
      alert("Выберите фото перед сохранением.");
    }
  };

  return (
    <div className="userProfile">
      <div className="profile__header">
        <h1>Profile</h1>
      </div>

      <Container>
        <Row>
          <Col style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="basic-url">First Name</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.first_name}`}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`first_name:${currentUser.first_name}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, first_name: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
          <Col style={{ marginTop: "30px" }}>
            <Form.Label htmlFor="basic-url">Last Name</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.last_name}`}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`${currentUser.last_name}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, last_name: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Username</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.username}`}
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`username:${currentUser.username}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, username: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">Password</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={"password"}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="password"
                placeholder={`${currentUser.password}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, password: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="profile_image">
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button onClick={savePhotoToLocalStorage}>Добавить фото</Button>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <Form.Label htmlFor="basic-url">Email</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.email}`}
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="email"
                placeholder={`email:${currentUser.email}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, email: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <Form.Label htmlFor="basic-url">Linkedin</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.linkedin ? currentUser.linkedin : ""}`}
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`linkedin:${currentUser?.linkedin}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, linkedin: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Phone</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.phone}`}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`phone: ${currentUser.phone}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, phone: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">Date of Birth</Form.Label>
            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.birthday}`}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="date"
                placeholder={`date of birth: ${currentUser.birthday}`}
                onChange={(e) =>
                  setSendProf({ ...sendProf, birthday: e.target.value })
                }
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Organization</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${
                currentUser.work_info ? currentUser.work_info.org : ""
              }`}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`Organization:${
                  currentUser.work_info ? currentUser.work_info.org : ""
                }`}
                onChange={(e) => {
                  setSendProf({
                    ...sendProf,
                    work_info: { ...sendProf.work_info, org: e.target.value },
                  });
                }}
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">Role</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${
                currentUser.work_info ? currentUser.work_info.role : ""
              }`}
              required
              className="mb-4"
              style={{ overflow: "hidden" }}
            >
              <Form.Control
                type="text"
                placeholder={`Role: ${
                  currentUser.work_info ? currentUser.work_info.role : ""
                }`}
                onChange={(e) => {
                  setSendProf({
                    ...sendProf,
                    work_info: { ...sendProf.work_info, role: e.target.value },
                  });
                }}
                style={{ overflow: "hidden" }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Country</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${
                currentUser.work_info ? currentUser.address.country : ""
              }`}
              required
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder={`Country: ${
                  currentUser.work_info ? currentUser.address.country : ""
                }`}
                onChange={(e) =>
                  setSendProf((prevState) => ({
                    ...prevState,
                    address: {
                      ...prevState.address,
                      country: e.target.value,
                    },
                  }))
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">City</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.address ? currentUser.address.city : ""}`}
              required
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder={`City: ${
                  currentUser.address ? currentUser.address.city : ""
                }`}
                onChange={(e) =>
                  setSendProf((prevState) => ({
                    ...prevState,
                    address: {
                      ...prevState.address,
                      city: e.target.value,
                    },
                  }))
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label htmlFor="basic-url">Region</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.address ? currentUser.address.region : ""}`}
              required
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder={`Region: ${
                  currentUser.address ? currentUser.address.region : ""
                }`}
                onChange={(e) =>
                  setSendProf((prevState) => ({
                    ...prevState,
                    address: {
                      ...prevState.address,
                      region: e.target.value,
                    },
                  }))
                }
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Label htmlFor="basic-url">Street</Form.Label>

            <FloatingLabel
              controlId="floatingInput"
              label={`${currentUser.address ? currentUser.address.street : ""}`}
              required
              className="mb-4"
            >
              <Form.Control
                type="text"
                placeholder={`Street: ${
                  currentUser.address ? currentUser.address.street : ""
                }`}
                onChange={(e) =>
                  setSendProf((prevState) => ({
                    ...prevState,
                    address: {
                      ...prevState.address,
                      street: e.target.value,
                    },
                  }))
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Col>
          <Button onClick={handleSend}>Save</Button>
        </Col>
      </Container>

      <>{contextHolder}</>
    </div>
  );
};

export default UserProfile;
