import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.css';

const Menu = props => (
    <div className='menu'>
        <div className='menu-content'>
            <div className='client-menu'>
                <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/*`}>
                    Clientes
                </NavLink>
            </div>
        </div>
        <div className='menu-content'>
            <div className='service-menu'>
                <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/service`}>
                    Serviços
                </NavLink>
            </div>
        </div>
    </div>
)

export default Menu;