import { useState, useEffect } from 'react';
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
        <div className='form-area'>
          <div className='input-box'>
            <label for="fname">Nome</label>
            <input
              type="text"
              id="fname"
              name="firstname"
              placeholder="Nome..."
              value={name}
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
