import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {$host} from "../http";

function ReplayQr(props) {
    const { id } = useParams()

    const getUserData =async ()=>{
        try {
            const res = await $host.get('api/v2/contact/pk/'+id)
            window.location.assign(`/contact/${res.data.user.nick_name}`)
        }catch (e){window.location.assign('/')}
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div>

        </div>
    );
}

export default ReplayQr;