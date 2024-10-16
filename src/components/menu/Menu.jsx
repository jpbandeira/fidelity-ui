import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Menu.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, IconButton } from '@mui/material';

const MenuComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null)
    };
    const navigate = useNavigate();

    const handleStoreClient = (event) => {
        handleClose();
        navigate();
    };
    const handleNewService = (event) => {
        handleClose();
        navigate();
    };
    const handleDeleteClient = (event) => {
        handleClose();
        navigate();
    };


    return(

        <div className='menu'>
            <div className='menu-content'>
                <div className='client-menu'>
                    <IconButton onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleStoreClient}>Novo Cadastro</MenuItem>
                        <MenuItem onClick={handleNewService}>Adicionar Atendimento</MenuItem>
                        <MenuItem onClick={handleDeleteClient}>Deletar Cliente</MenuItem>
                        <MenuItem onClick={handleClose}>Configurações</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default MenuComponent;