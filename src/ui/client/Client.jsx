import { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Client.css';
import { listClients, deleteClient } from '../../data/services/client.js';
import ClientForm from './form/index.jsx';
import ClientList from './list/index.jsx';
import { VscMenu } from "react-icons/vsc";
import ClientContext from '../../contexts/client.js'
import { SAVE_BUTTON_LABEL, UPDATE_BUTTON_LABEL } from '../../consts.js';
import { TbArrowBack } from "react-icons/tb";

const Client = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const { switchClient, client } = useContext(ClientContext)

  const [filterValue, setFilterValue] = useState("")
  const [clientView, setClientView] = useState()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (client.id !== "" && client.id !== undefined) {
      setClientView(<ClientList />)
    }
  }, [])

  const newClient = () => {
    setClientView(<ClientForm buttonLabel={SAVE_BUTTON_LABEL} fetchClient={handleFetchClient} setFilterValue={setFilterValue} />)
  }

  const updateClient = () => {
    setClientView(<ClientForm buttonLabel={UPDATE_BUTTON_LABEL} fetchClient={handleFetchClient} setFilterValue={setFilterValue} />)
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleFetchClient = (filterArgs) => {
    if (filterArgs) {
      listClients(filterArgs)
        .then((response) => {
          if (response.data == null) {
            return
          }
          var body = response.data[0]
          switchClient({
            id: body.id,
            name: body.name,
            email: body.email,
            phone: body.phone,
          })
          setClientView(<ClientList />)
        })
    }
  }

  const handleDeleteClient = () => {
    if (client.id) {
      deleteClient(client.id)
        .then(() => {
          switchClient({})
          setClientView()
          setFilterValue("")
        })
        .catch(function (error) {
          console.error(error);
        })
    }
  }

  const handleBackToList = () => {
    if (client.id !== "" && client.id !== undefined) {
      setClientView(<ClientList />)
    } else {
      setClientView()
    }
  }

  return (
    <div className="client-body">
      <div id='search-client-area'>
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
            onClick={() => handleFetchClient(["name=" + filterValue])}
          />
        </div>
      </div>
      <div id='client-area'>
        <div className='client-actions-area'>
          <div id='back-route'>
            {location.pathname == "/*" && <TbArrowBack size={30} onClick={() => handleBackToList()} />}
          </div>
          <div id='actions'>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenMenu}
            >
              <VscMenu size={30} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <input
                  className='buttom-menu'
                  type="submit"
                  value="Novo Cadastro"
                  onClick={() => newClient(SAVE_BUTTON_LABEL)}
                />
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <input
                  className='buttom-menu'
                  type="submit"
                  value="Atualizar Cliente"
                  onClick={() => updateClient(UPDATE_BUTTON_LABEL)}
                  disabled={!client.name}
                />
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <input
                  className='buttom-menu'
                  type="submit"
                  value="Deletar Cliente"
                  onClick={() => handleDeleteClient()}
                  disabled={!client.name}
                />
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <input
                  className='buttom-menu'
                  type="submit"
                  value="Adicionar Atendimento"
                  onClick={() => navigate("/service")}
                  disabled={!client.name}
                />
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className='client-actions'>
          {clientView}
        </div>
      </div>
    </div>
  );
}

export default Client;
