import './App.css';
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Menu from '../../components/menu/Menu';
import Client from '../client/Client';
import Login from '../login/Login';
import Appointment from '../appointment/Appointment';
import ClientContext from '../../contexts/client.js'

function App() {
  const [client, setClient] = useState({
    ID: '',
    Name: '',
    Email: '',
    Phone: '',
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ClientContext.Provider value={{ switchClient: setClient, client }}>
      <div className="body">
        <BrowserRouter>
          <Routes>
            {/* Rota de login: sem menu */}
            <Route
              path="/"
              element={
                isLoggedIn
                  ? <Navigate to="/client" />
                  : <Login onLogin={() => setIsLoggedIn(true)} />
              }
            />

            {/* Rotas protegidas: com menu */}
            {isLoggedIn && (
              <Route
                path="/*"
                element={
                  <>
                    <div className="header" id="start">
                      <div className="header-content">
                        <Menu />
                      </div>
                    </div>
                    <div className="content">
                      <Routes>
                        <Route path="/client" element={<Client />} />
                        <Route path="/appointment" element={<Appointment />} />
                      </Routes>
                    </div>
                  </>
                }
              />
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ClientContext.Provider >
  );
}

export default App;
