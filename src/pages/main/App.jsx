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


import { ClientProvider } from '../../contexts/client/Provider';
import { SessionProvider } from '../../contexts/session/Provider';

import { login, register } from '../../data/services/authentication.js';
import { decodeJWT } from '../../utils/token.js';

function App() {
  const [client, setClient] = useState({
    ID: '',
    Name: '',
    Email: '',
    Phone: '',
  })

  const [userSession, setUserSession] = useState({})

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogin = async (email, password) => {
    var token = await login({ "email": email, "password": password })
    if (token !== null) {
      var tokenClaims = decodeJWT(token)
      // store user session
      setIsLoggedIn(true)
    }
  }

  return (
    <SessionProvider>
      <div className="body">
        <BrowserRouter>
          <Routes>
            {/* Rota de login: sem menu */}
            <Route
              path="/"
              element={
                isLoggedIn
                  ? <Navigate to="/client" />
                  : <Login onLogin={handleLogin} />
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
                        <ClientProvider>
                          <Menu />
                        </ClientProvider>
                      </div>
                    </div>
                    <div className="content">
                      <Routes>
                        <Route path="/client" element={<ClientProvider><Client /></ClientProvider>} />
                        <Route path="/appointment" element={<ClientProvider><Appointment /></ClientProvider>} />
                      </Routes>
                    </div>
                  </>
                }
              />
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </SessionProvider>
  );
}

export default App;
