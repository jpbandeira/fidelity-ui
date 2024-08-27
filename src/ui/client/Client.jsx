import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Client.css';
import { listUsers } from '../../data/services/user.js';

const Client = () => {
  const SAVE_BUTTON_LABEL = "Salvar"
  const UPDATE_BUTTON_LABEL = "Atualizar"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [filterValue, setFilterValue] = useState("")
  const [buttonLabel, setButtonLabel] = useState(SAVE_BUTTON_LABEL)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchClient = () => {
    listUsers("name", filterValue)
      .then((response) => {
        var body = response.data[0]
        setName(body.Name)
        setEmail(body.Email)
        setPhone(body.Phone)
        setButtonLabel(UPDATE_BUTTON_LABEL)
      })
  }

  const storeClient = () => {
    setName("")
    setEmail("")
    setPhone("")
    setFilterValue("")
    setButtonLabel(SAVE_BUTTON_LABEL)
  }

  return (
    <div className="client-body">
      <div className='search-client-area'>
        <div className='search-client-input-area'>
          <input
            className='search-client-input'
            type="text"
            id="fname"
            name="firstname"
            placeholder="Nome..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className='search-client-button-area'>
          <input
            className='buttom-search-input'
            type="submit"
            value="Buscar"
            onClick={() => fetchClient()}
          />
        </div>
        <div className='create-client-button-area'>
          <input
            className='buttom-save-input'
            type="submit"
            value="Cadastrar"
            onClick={() => storeClient()}
          />
        </div>
      </div>
      <div className='client-area'>
        <div className='client-actions-area'>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Ações
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <input
                className='buttom-store'
                type="submit"
                value="Cadastrar"
                onClick={() => storeClient()}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <NavLink
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/service`}>
                Serviços
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <input
                className='buttom-store'
                type="submit"
                value="Deletar"
                onClick={() => storeClient()}
              />
            </MenuItem>
          </Menu>
        </div>
        <div className='form-area'>
          <div className='input-box'>
            <label for="fname">Nome</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <label for="fname">Email</label>
            <input
              type="email"
              id="fname"
              name="firstname"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <label for="fname">Telefone</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Telefone..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='buttom-save-area'>
            <input
              className='buttom-save-input'
              type="submit"
              value={buttonLabel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
