import React, {useEffect,useState} from 'react';
import "../../../assets/css/Theme-page.css"
import {$authHost} from "../../../http";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faEnvelope, faMapLocationDot, faPhone, faUserTie} from "@fortawesome/free-solid-svg-icons";
const UserTheme = () => {
    const [User, setUser] = useState();
    const [themeApi , setThemeApi] = useState()
    const [activeNav, setActiveNav] = useState("1");

    const handleNavBtnClick = (key) => {
        setActiveNav(key);
    };
    console.log(themeApi)

    const getUser = async () => {
        try {
            const res = await $authHost.get("api/v1/users/" + localStorage.getItem("uuid"));
            setUser(res.data);
            setThemeApi(res.data.theme)
        }catch (e){
            console.log(e)
        }
    };
    useEffect(() => {getUser()}, []);
    const listTheme = [
        {theme:'whiteBlack', color1:'#fff', color2:'#000' ,textColor:'#000',textColor2:'#fff'},
        {theme:'greenBlack', color1:'#7dba28', color2: '#000',textColor:'#fff',textColor2:'#fff'},
        {theme:'blackGreen', color1: '#000', color2: '#7dba28',textColor:'#fff',textColor2:'#fff'}
    ]
    const listThemeRouter = listTheme.map((item,i)=>{
        const activeNavCss ={

                background:item.color2,
color:item.textColor2,

        }
        return(<div className={`${themeApi === item.theme ? "activeTheme" : ''} theme`}>

<div className="theme-box">
    {themeApi === item.theme ? <span className={'activeText'}>active</span>:''}
    <div className={`admin__card`} style={{background:"none"}}>
        <div className="admin__blanc" style={{padding:0 , background:item.color1 ,color:item.textColor }}>
            <div className="admin__card-photo">
                <div className="admin__card-circle">
                    {/* <div className="rectangle"></div> */}
                    {User ? User.first_name[0] : <p>Loading...</p>}
                </div>
                <div className="admin__card-fullName">
                    {/* <input placeholder="Full name" type="text"/> */}
                    <div className="admin__card-names">
                        {User ? (
                            <div>
                                {User.first_name} {User.last_name}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="admin__card-about">
                <div className="admin__contact-navbar">
                    <div
                        onClick={() => handleNavBtnClick("1")}
                        style={ activeNav === "1" ? activeNavCss : {background:"transparent"}}
                        className={`${
                            activeNav === "1" ? activeNavCss : ""
                        } navbar-btn`}
                    >
                        <span>Contact</span>
                    </div>
                    <div
                        onClick={() => handleNavBtnClick("2")}
                        style={ activeNav === "2" ? activeNavCss : {background:"transparent"}}
                        className={`${
                            activeNav === "2" ? activeNavCss : ""
                        } navbar-btn`}
                    >
                        <span>Company</span>
                    </div>
                    <div
                        onClick={() => handleNavBtnClick("3")}
                        style={ activeNav === "3" ? activeNavCss : {background:"transparent"}}
                        className={`${
                            activeNav === "3" ? activeNavCss : ""
                        } navbar-btn`}
                    >
                        <span>Address</span>
                    </div>
                </div>
            </div>
            <div className="admin__card-info" style={{background:item.color2, color:"white"}}>
                {activeNav === "1" && (
                    <div className="admin__card-contact card__about">
                        <div className="card__info-phone card__inner-info">
                            <FontAwesomeIcon icon={faPhone} size="lg"/>
                            <div>
                                <p>Mobile Phone</p>
                                {User ? User.phone : "add phone"}
                                <div className="card__line"></div>
                            </div>
                        </div>
                        <div className="card__info-email card__inner-info">
                            <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                            <div>
                                <p>Email</p>
                                {User ? User.email : "add email"}
                            </div>
                        </div>
                    </div>
                )}
                {activeNav === "2" && (
                    <div className="admin__card-company card__about">
                        <div className="card__info-organization card__inner-info">
                            <FontAwesomeIcon icon={faBuilding} size="lg"/>
                            <div>
                                <p>Company</p>
                                {User ? User.work_info.org : "add info"}
                                <div className="card__line"></div>
                            </div>
                        </div>
                        <div className="card__info-role card__inner-info">
                            <FontAwesomeIcon icon={faUserTie} size="lg"/>
                            <div>
                                <p>Profession</p>
                                {User ? User.work_info.role : "add info"}
                            </div>
                        </div>
                    </div>
                )}
                {activeNav === "3" && (
                    <div className="admin__card-address card__about">
                        <div className="card__info-adress card__inner-info">
                            <FontAwesomeIcon icon={faMapLocationDot} size="lg"/>
                            <div>
                                <p>Address</p>
                                {User !== null
                                    ? `${User.address.country} ${User.address.city} ${User.address.region} ${User.address.street}`
                                    : "add address"}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
</div>

            </div>
    )})

    return (
        <div >
            <div className="theme__box">
                {listThemeRouter}


            </div>
        </div>
    );
};

export default UserTheme;