import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Client.css';
import { listUsers, createUser, deleteUser } from '../../data/services/user.js';
import ClientForm from './form/index.jsx';
import ClientList from './list/index.jsx';

const Client = () => {
  const navigate = useNavigate();

  const SAVE_BUTTON_LABEL = "Salvar"
  const UPDATE_BUTTON_LABEL = "Atualizar"

  const [id, setId] = useState("")
  const [name, setName] = useState("Joao Pedro Bandeira de Lima")
  const [email, setEmail] = useState("jpbandeiralima@gmmail.com")
  const [phone, setPhone] = useState("(85) 9 4574-5147")

  const [filterValue, setFilterValue] = useState("")

  const [html, setHtml] = useState()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const newClient = () => {
    setHtml(<ClientForm nameProp="" emailProp="" phoneProp="" buttonLabel={SAVE_BUTTON_LABEL} />)
  }

  const updateClient = () => {
    setHtml(<ClientForm nameProp={name} emailProp={email} phoneProp={phone} buttonLabel={UPDATE_BUTTON_LABEL} />)
  }

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
          setId(body.ID)
          setName(body.Name)
          setEmail(body.Email)
          setPhone(body.Phone)
          setHtml(<ClientList nameProp={body.Name} emailProp={body.Email} phoneProp={body.Phone} />)
        })
    }
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
        })
        .catch(function (error) {
          console.error(error);
        })
    }
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
                onClick={() => newClient(SAVE_BUTTON_LABEL)}
              />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <input
                className='buttom-menu'
                type="submit"
                value="Atualizar"
                onClick={() => updateClient(UPDATE_BUTTON_LABEL)}
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
        <div className='client-actions'>
          <ClientList nameProp={name} emailProp={email} phoneProp={phone} />
        </div>
      </div>
    </div>
  );
}

export default Client;
