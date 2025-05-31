import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Menu.css';
import { FaGear } from "react-icons/fa6";
import { TbArrowBack } from "react-icons/tb";
import { useSession } from '../../contexts/session/Context.js';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { userSession } = useSession()

    return (
        <div id='menu-container'>
            <div id='menu-back-route'>
                {location.pathname === "/appointment" && <TbArrowBack size={30} onClick={() => navigate(-1)} />}
            </div>
            <div id='menu-client-name'>{userSession.name}</div>
            <div id='menu-config'>
                <FaGear size={30} />
            </div>
        </div>
    )
}

export default Menu;