import React, {useEffect, useRef, useState} from 'react';
import {$authHost} from "../../../http";
import {message, Popconfirm, Button, Modal, Input,DatePicker} from 'antd';
import {Table} from "react-bootstrap";

const DeleteUser = async (e, username) => {
    console.log(e)
    try {
        $authHost.delete('api/v1/users/' + e)
        message.success(`${username} deleted`);
        return window.location.reload()
    } catch (error) {
        alert(error)
    }
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};

const CompanyUserList = () => {
    const [updateOpen, setUpdateOpen] = useState(false);
    const [data, setData] = useState([]);
    const [createUser, setCreateUser] = useState({
        birthday:'',
        work_info:{
            org:'',
            role:''
        },
        address:{
            street: '',
            region:'',
            city:'',
            country:''
        },
        created_by:localStorage.getItem('uuid')
    });
    const [updateUser, setUpdateUser] = useState({
        birthday:'',
        work_info:{
            org:'',
            role:''
        },
        address:{
            street: '',
            region:'',
            city:'',
            country:''
        },
        created_by_id:localStorage.getItem('uuid')
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateID , setUpdateID] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalUpdate = (id) => {
        setUpdateID(id)
        setUpdateOpen(true);
    };
    const handleCancelUpdate = () => {
        setUpdateOpen(false);
    };
    const birthdayChange = (date, dateString) => {
        setCreateUser({...createUser , birthday: dateString})
    };
    const birthdayUpdate = (date, dateString) => {
        setUpdateUser({...updateUser , birthday: dateString})
    };


    const sendNewUser = async ()=> {
        if (createUser.username ==='' || createUser.username === undefined){
            messageApi.open({
                type: 'error',
                content: 'Username',
            })
        }else if (createUser.password === '' || createUser.password === undefined){
            messageApi.open({
                type: 'error',
                content: 'password',
            })
        }else if (createUser.last_name === '' || createUser.last_name === undefined){
            messageApi.open({
                type: 'error',
                content: 'last_name',
            })
        }else if (createUser.first_name === '' || createUser.first_name === undefined){
            messageApi.open({
                type: 'error',
                content: 'first_name',
            })
        }else if (createUser.phone === '' || createUser.phone === undefined){
            messageApi.open({
                type: 'error',
                content: 'phone',
            })
        }else if (createUser.birthday === '' || createUser.birthday === undefined){
            messageApi.open({
                type: 'error',
                content: 'birthday',
            })
        }else {
            try {
                const res = await $authHost.post("api/v1/users/", createUser)
                messageApi.open({
                    type: 'success',
                    content: res.data.username +" created",
                })
                setTimeout(()=>{
                    return window.location.reload()

                },2000)
            }catch (e) {
                messageApi.open({
                    type: 'error',
                    content: e.message,
                })
                console.log(e)
            }
        }



    }

    const sendUpdate = async ()=> {
        const get = await $authHost.get("api/v1/users/"+updateID+"/")
        let dataIndex = {
            username: updateUser.username ? updateUser.username : get.data.username,
            email: updateUser.email ? updateUser.email : get.data.email,
            password: updateUser.password ,
            first_name: updateUser.first_name ? updateUser.first_name : get.data.first_name,
            last_name: updateUser.last_name ? updateUser.last_name : get.data.last_name,
            phone: updateUser.phone ? updateUser.phone : get.data.phone,
            birthday: updateUser.birthday ? updateUser.birthday : get.data.birthday,
            created_by_id:get.data.created_by_id,
            theme:get.data.theme,
            work_info: {
                org: updateUser.work_info  ?  updateUser.work_info.org :  get.data.work_info.org,
                role: updateUser.work_info  ? updateUser.work_info.role : get.data.work_info.role
            },
            address: {
                city: updateUser.address.city ?  get.data.address.city:  updateUser.address.city,
                street: updateUser.address.street ?  get.data.address.street : updateUser.address.street,
                region: updateUser.address.region ?  get.data.address.region :  updateUser.address.region,
                country: updateUser.address.country ? get.data.address.country :  updateUser.address.country
            }
        }
        if (dataIndex.username ==='' || dataIndex.username === undefined){
            messageApi.open({
                type: 'error',
                content: 'Username',
            })
        }else if (dataIndex.password === '' || dataIndex.password === undefined){
            messageApi.open({
                type: 'error',
                content: 'password',
            })
        }else if (dataIndex.last_name === '' || dataIndex.last_name === undefined){
            messageApi.open({
                type: 'error',
                content: 'last_name',
            })
        }else if (dataIndex.first_name === '' || dataIndex.first_name === undefined){
            messageApi.open({
                type: 'error',
                content: 'first_name',
            })
        }else if (dataIndex.phone === '' || dataIndex.phone === undefined){
            messageApi.open({
                type: 'error',
                content: 'phone',
            })
        }else if (dataIndex.birthday === '' || dataIndex.birthday === undefined){
            messageApi.open({
                type: 'error',
                content: 'birthday',
            })
        }else {
            try {
                const res = await $authHost.put("api/v1/users/"+updateID+"/", dataIndex)
                console.log()
                messageApi.open({
                    type: 'success',
                    content: res.data.username +" update",
                })
                setTimeout(()=>{
                    // return window.location.reload()

                },2000)
            }catch (e) {
                messageApi.open({
                    type: 'error',
                    content: e.message,
                })
                console.log(e)
            }
        }

    }
    const userList = async () => {
        const res = await $authHost.get('api/v1/users/')
        setData(res.data.map(row => ({
            id: row.id,
            username: row.username,
            phone: row.phone,
            work_info: row.work_info
        })))
    }
    const tableUser = data.map((item) => {
        return <>

            <tr >
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.phone}</td>
                <td>
                    <Popconfirm
                        title="Delete "
                        description="delete"
                        onConfirm={() => DeleteUser(item.id, item.username)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                    <Button type="primary" onClick={()=>showModalUpdate(item.id)}>
                        Update
                    </Button>
                </td>
            </tr>
        </>
    })
    useEffect(() => {
        userList()
    }, [])
    return (
        <div className={'user-list'}>
            {contextHolder}

            <Button type="primary" style={{marginTop:"50px", marginBottom:"30px"}} onClick={showModal}>
                Create User
            </Button>
            <Modal title="Creat user" open={isModalOpen} onCancel={handleCancel}>
                <>
                    <Input placeholder="username"
                           required
                           onChange={e => {
                               setCreateUser({...createUser, username: e.target.value})
                           }}/>
                    <Input placeholder="email"
                           required
                           onChange={e => {
                               setCreateUser({...createUser, email: e.target.value})
                           }}/>
                    <Input placeholder="password"
                           required
                           onChange={e => {
                               setCreateUser({...createUser, password: e.target.value})
                           }}/>
                    <Input placeholder="first_name"
                           onChange={e => {
                               setCreateUser({...createUser, first_name: e.target.value})
                           }}/>
                    <Input placeholder="last_name"
                           required
                           onChange={e => {
                               setCreateUser({...createUser, last_name: e.target.value})
                           }}/>
                    <Input placeholder="phone"
                           required
                           onChange={e => {
                               setCreateUser({...createUser, phone: e.target.value})
                           }}
                    />
                    <DatePicker onChange={birthdayChange}
                    />
                    <Input placeholder="Organization"
                           required
                           onChange={(e) => {
                               setCreateUser({...createUser , work_info:{...createUser.work_info , org:e.target.value}});
                           }}/>
                    <Input placeholder="Role"
                           required
                           onChange={(e) => {
                               setCreateUser({...createUser , work_info:{...createUser.work_info , role:e.target.value}});
                           }}/>


                    <Input
                        type="text"
                        placeholder="city"
                        onChange={(e) => {
                            setCreateUser({...createUser , address:{...createUser.address , city:e.target.value}});
                        }}
                    />


                    <Input
                        type="text"
                        placeholder="street"
                        onChange={(e) => {
                            setCreateUser({...createUser , address:{...createUser.address , street:e.target.value}});
                        }}
                    />


                    <Input
                        type="text"
                        placeholder="region"
                        onChange={(e) => {
                            setCreateUser({...createUser , address:{...createUser.address , region:e.target.value}});
                        }}
                    />


                    <Input
                        type="text"
                        placeholder="country"
                        onChange={(e) => {
                            setCreateUser({...createUser , address:{...createUser.address , country:e.target.value}});
                        }}
                    />
                    <button type={"submit"} onClick={sendNewUser}>send</button>
                </>
            </Modal>
            <Modal title="Update" open={updateOpen} onCancel={handleCancelUpdate} >
                <>
                    <Input placeholder="username"
                           required
                           onChange={e => {
                               setUpdateUser({...updateUser, username: e.target.value})
                           }}/>
                    <Input placeholder="email"
                           required
                           onChange={e => {
                               setUpdateUser({...updateUser, email: e.target.value})
                           }}/>
                    <Input placeholder="password"
                           required
                           onChange={e => {
                               setUpdateUser({...updateUser, password: e.target.value})
                           }}/>
                    <Input placeholder="first_name"
                           onChange={e => {
                               setUpdateUser({...updateUser, first_name: e.target.value})
                           }}/>
                    <Input placeholder="last_name"
                           required
                           onChange={e => {
                               setUpdateUser({...updateUser, last_name: e.target.value})
                           }}/>
                    <Input placeholder="phone"
                           required
                           onChange={e => {
                               setUpdateUser({...updateUser, phone: e.target.value})
                           }}
                    />
                    <DatePicker onChange={birthdayUpdate}
                    />
                    <Input placeholder="Organization"
                           required
                           onChange={(e) => {
                               setUpdateUser({...updateUser , work_info:{...updateUser.work_info , org:e.target.value}});
                           }}/>
                    <Input placeholder="Role"
                           required
                           onChange={(e) => {
                               setUpdateUser({...updateUser , work_info:{...updateUser.work_info , role:e.target.value}});
                           }}/>


                    <Input
                        type="text"
                        placeholder="city"
                        onChange={(e) => {
                            setUpdateUser({...updateUser , address:{...updateUser.address , city:e.target.value}});
                        }}
                    />


                    <Input
                        type="text"
                        placeholder="street"
                        onChange={(e) => {
                            setUpdateUser({...updateUser , address:{...updateUser.address , street:e.target.value}});
                        }}
                    />


                    <Input
                        type="text"
                        placeholder="region"
                        onChange={(e) => {
                            setUpdateUser({...updateUser , address:{...updateUser.address , region:e.target.value}});
                        }}
                    />


                    <Input
                        type="text"
                        placeholder="country"
                        onChange={(e) => {
                            setUpdateUser({...updateUser , address:{...updateUser.address , country:e.target.value}});
                        }}
                    />
                    <Button  onClick={()=>sendUpdate()}>send</Button>
                </>
            </Modal>

            <Table>
                <thead>
                <th>id</th>
                <th>username</th>
                <th>Phone</th>
                <th>Action</th>
                </thead>
                <tbody>
                {tableUser}
                </tbody>
            </Table>
        </div>
    );
};

export default CompanyUserList;
