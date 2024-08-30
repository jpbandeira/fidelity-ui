import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Client.css';
import { listUsers, createUser, deleteUser } from '../../data/services/user.js';

const Client = () => {
  const navigate = useNavigate();

  const SAVE_BUTTON_LABEL = "Salvar"
  const UPDATE_BUTTON_LABEL = "Atualizar"

  const [id, setId] = useState("")
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
    if (filterValue) {
      listUsers("name", filterValue)
        .then((response) => {
          if (response.data == null) {
            return
          }

          var body = response.data[0]
          console.log(body)
          setId(body.ID)
          setName(body.Name)
          setEmail(body.Email)
          setPhone(body.Phone)
          setButtonLabel(UPDATE_BUTTON_LABEL)
        })
    }
  }

  const createClient = () => {
    createUser({
      name: name,
      email: email,
      phone: phone
    })
      .then((response) => {
        if (response.data == null) {
          return
        }

        var body = response.data
        setId(body.ID)
        setName(body.Name)
        setEmail(body.Email)
        setPhone(body.Phone)
        setButtonLabel(UPDATE_BUTTON_LABEL)
      })
      .catch(function (error) {
        console.error(error);
        setButtonLabel(SAVE_BUTTON_LABEL)
      })
  }

  const deleteClient = () => {
    console.log(id)
    if (id) {
      deleteUser(id)
        .then(() => {
          setId("")
          setName("")
          setEmail("")
          setPhone("")
          setButtonLabel(SAVE_BUTTON_LABEL)
        })
        .catch(function (error) {
          setButtonLabel(UPDATE_BUTTON_LABEL)
          console.error(error);
        })
    }
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
                className='buttom-menu'
                type="submit"
                value="Novo Cadastro"
                onClick={() => storeClient()}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <input
                className='buttom-menu'
                type="submit"
                value="Adicionar Atendimento"
                onClick={() => navigate("/service:service", {
                  state:
                  {
                    name: name,
                    email: email,
                    phone: phone
                  }
                })}
                disabled={!name}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <input
                className='buttom-menu'
                type="submit"
                value="Deletar"
                onClick={() => deleteClient()}
                disabled={!name}
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
              name="name"
              placeholder="Nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <label for="fname">Email</label>
            <input
              type="email"
              id="femail"
              name="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-box'>
            <label for="fname">Telefone</label>
            <input
              type="text"
              id="fphone"
              name="phone"
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
              onClick={() => createClient()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client;
