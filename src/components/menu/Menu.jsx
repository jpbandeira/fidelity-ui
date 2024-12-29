import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Menu.css';
import { FaGear } from "react-icons/fa6";

const Menu = () => {
    const navigate = useNavigate();

    return (
        <div className='menu'>
            <div className='menu-content'>
                {/* <NavLink */}
                {/* // style={{ textDecoration: 'none' }} */}
                {/* // to={`/*`}> */}
                {/* </NavLink> */}
                <FaGear size={30} onClick={() => navigate(-1)} />
            </div>
        </div>
    )
}

export default Menu;