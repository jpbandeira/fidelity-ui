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
                    Icon de Configurações
                </NavLink>
            </div>
        </div>
    </div>
)

export default Menu;