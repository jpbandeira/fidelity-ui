import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Menu.css';
import { FaGear } from "react-icons/fa6";
import { TbArrowBack } from "react-icons/tb";

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation()

    return (
        <div id='menu-container'>
            <div id='menu-back-route'>
                {location.pathname == "/service" && <TbArrowBack size={30} onClick={() => navigate(-1)} />}
            </div>
            <div id='menu-config'>
                <FaGear size={30} />
            </div>
        </div>
    )
}

export default Menu;