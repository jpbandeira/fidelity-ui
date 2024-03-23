import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.css';

const Menu = props => (
    <div className='menu'>
        <div className='menu-content'>
            <NavLink
                style={{ color: 'black' }}
                to={`/*`}>
                Clientes
            </NavLink>
        </div>
        <div className='menu-content'>
            <NavLink
                style={{ color: 'black' }}
                to={`/service`}>
                Serviços
            </NavLink>
        </div>
    </div>
)

export default Menu;