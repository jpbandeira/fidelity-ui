import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Client.css';
import { listClients, deleteClient } from '../../data/services/client.js';
import ClientForm from './form/index.jsx';
import ClientList from './list/index.jsx';
import { VscMenu } from "react-icons/vsc";
import { useClient } from '../../contexts/client/Context.js';
import { SAVE_BUTTON_LABEL, UPDATE_BUTTON_LABEL } from '../../consts.js';
import { TbArrowBack } from "react-icons/tb";
import { Toaster, toast } from 'sonner'
import { ButtonGradient } from '../../components/Button/index.jsx';

import "./Modal.css";
import { is_valid_name, is_number, is_valid_phone } from '../../utils/regex.js';

import { useSession } from '../../contexts/session/Context.js';

const Modal = ({ isOpen, onClose, confirmationMessage, alertMessage, clientName, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{confirmationMessage}</p>
        <p className="modal-message">{clientName}</p>
        <p className="modal-message">{alertMessage}</p>
        <div className="modal-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="modal-button"
              style={{ backgroundColor: action.color || 'gray' }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Client = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { switchClient, client } = useClient()

  const [filterValue, setFilterValue] = useState("")
  const [clientView, setClientView] = useState()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isForm, setIsForm] = useState(false);

  const { userSession, switchUserSession } = useSession()

  useEffect(() => {
    console.log(userSession)
    if (!userSession) {
      navigate("/login")
    }

    if (client !== null) {
      setFilterValue(client.name)
      setClientView(<ClientList />)
    }
  }, [])

  const newClientView = () => {
    handleCloseMenu()
    setIsForm(true)
    setClientView(<ClientForm buttonLabel={SAVE_BUTTON_LABEL} fetchClient={handleFetchClient} setFilterValue={setFilterValue} toast={toast} />)
  }

  const updateClientView = () => {
    handleCloseMenu()
    setIsForm(true)
    setClientView(<ClientForm buttonLabel={UPDATE_BUTTON_LABEL} fetchClient={handleFetchClient} setFilterValue={setFilterValue} toast={toast} />)
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleFetchClient = async () => {
    if (filterValue === "") {
      toast.warning("Filtro obrigatório!", {
        duration: 6000
      })
      setIsForm(false)
      switchClient(null)
      setClientView()

      return
    }

    let args = []
    if (is_number(filterValue) && !is_valid_phone(filterValue)) {
      toast.warning("Telefone deve conter 11 digitos", {
        duration: 6000
      })
      switchClient(null)
      setClientView()

      return
    }

    if (!is_number(filterValue) && !is_valid_name(filterValue)) {
      toast.warning("Nome só deve conter letras A-Z a-z", {
        duration: 6000
      })
      switchClient(null)
      setClientView()

      return
    }

    if (is_number(filterValue)) {
      args = ["phone=" + filterValue]
    } else {
      args = ["name=" + filterValue]
    }

    var body = await listClients(args)
    var items = body

    if (Array.isArray(items) && items.length > 0) {
      var body = items[0]
      switchClient({
        id: body.id,
        name: body.name,
        email: body.email,
        phone: body.phone,
      })
      toast.dismiss()
      setClientView(<ClientList />)
    } else {
      toast.warning("Cliente não cadastrado!", {
        duration: 6000
      })
      switchClient(null)
      setClientView()
    }
  }

  const handleDeleteClient = async () => {
    if (client !== null) {
      var response = await deleteClient(client.id)
      if (response === undefined) {
        switchClient(null)
        setClientView()
        setFilterValue("")
        setIsModalOpen(false)
        toast.success('Cliente deletado!')
      }
    }
  }

  const handleBackToList = () => {
    if (client !== null) {
      setIsForm(false)
      setClientView(<ClientList />)
    } else {
      setClientView()
    }
  }

  const handleRedirecttToService = () => {
    handleCloseMenu()
    navigate("/appointment")
  }

  const handleOpenDeleteClientModal = () => {
    handleCloseMenu()
    setIsModalOpen(true)
  }

  const handleLogout = () => {
    navigate("/")
    switchUserSession(null);
  };

  return (
    <div className="client-body">
      <Toaster position="top-right" richColors expand={true} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        confirmationMessage={`Confirma deleção do cliente ?`}
        alertMessage={`Todo histórico de fidelidade do cliente será perdido.`}
        clientName={client !== null && client.name}
        actions={[
          { label: "Cancelar", onClick: () => setIsModalOpen(false), color: "red" },
          { label: "Confirmar", onClick: () => handleDeleteClient(), color: "green" },
        ]}
      />
      <div id='search-client-area'>
        <div className='search-client-input-area'>
          <input
            className='search-client-input'
            type="text"
            id="ffilter"
            name="filter"
            placeholder="Filtre por Nome ou Telefone"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
        <div className='search-client-button-area'>
          <ButtonGradient onClick={() => handleFetchClient()} $width="60px">Buscar</ButtonGradient>
        </div>
      </div>
      <div id='client-area'>
        <div className='client-actions-area'>
          <div id='back-route'>
            {isForm && client !== null && <TbArrowBack size={30} onClick={() => handleBackToList()} />}
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
              <MenuItem>
                <button
                  className='buttom-menu'
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  className='buttom-menu'
                  onClick={() => newClientView(SAVE_BUTTON_LABEL)}
                >
                  Novo Cadastro
                </button>
              </MenuItem>
              {client !== null &&
                <MenuItem>
                  <button
                    className='buttom-menu'
                    onClick={() => updateClientView(UPDATE_BUTTON_LABEL)}
                    disabled={!client.name}
                  >
                    Atualizar Cliente
                  </button>
                </MenuItem>
              }
              {client !== null &&
                <MenuItem>
                  <button
                    className='buttom-menu'
                    onClick={() => handleOpenDeleteClientModal()}
                    disabled={!client.name}
                  >
                    Deletar Cliente
                  </button>
                </MenuItem>
              }
              {client !== null &&
                <MenuItem>
                  <button
                    className='buttom-menu'
                    onClick={() => handleRedirecttToService()}
                    disabled={!client.name}
                  >
                    Adicionar Atendimento
                  </button>
                </MenuItem>
              }
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
