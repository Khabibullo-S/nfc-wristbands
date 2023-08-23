import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {$host} from "../http";

function ReplayQr(props) {
    const { id } = useParams()

    const getUserData =async ()=>{
        try {
            const res = await $host.get('api/v2/contact/pk/'+id)
            window.location.assign(`contact/${res.data.user.nick_name}`)
        }catch (e){console.log(e)}
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <div>
            LOADING...
        </div>
    );
}

export default ReplayQr;