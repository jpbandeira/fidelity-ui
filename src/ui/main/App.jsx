import './App.css';
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  Routes,
  Route,
} from "react-router-dom";
import Menu from '../../components/menu/Menu';
import Client from '../client/Client';
import Service from '../service/Service';
import ClientContext from '../../contexts/client.js'

function App() {
  const [client, setClient] = useState({
    id: '',
    name: 'Joao Pedro Bandeira de Lima',
    email: 'joao@gmail.com',
    phone: '85999554141',
  })

  return (
    <ClientContext.Provider value={{ switchClient: setClient, client }}>
      <div className="body">
        <BrowserRouter>
          <div className='header' id='start'>
            <div className='menu'>
              <Menu />
            </div>
          </div>

          <div className='content'>
            <Routes>
              {/* <Route path='*' element={<Client />} />
              <Route path='/service' element={<Service />} /> */}
              <Route path='/service' element={<Client />} />
              <Route path='*' element={<Service />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ClientContext.Provider >
  );
}

export default App;
