import React, {useEffect,useState} from 'react';
import "../../../assets/css/Theme-page.css"
import {$authHost} from "../../../http";
const UserTheme = () => {
    const [User, setUser] = useState();
    console.log(User)

    const getUser = async () => {
        try {
            const res = await $authHost.get("api/v1/users/" + localStorage.getItem("uuid"));
            setUser(res.data);
        }catch (e){
            console.log(e)
        }
    };
    useEffect(() => {getUser()}, []);
    const listTheme = [
        {theme:'whiteBlack'},
        {theme:'greenBlack'},
        {theme:'blackGreen'}
    ]
    const listThemeRouter = listTheme.map((item,i)=>{
        return(<div className={`theme_item ${User.theme === item.theme ? 'activeTheme':''}`} key={i}>

        </div>)
    })

    return (
        <div >
            <div className="theme__box">
                {listThemeRouter}
            </div>
        </div>
    );
};

export default UserTheme;