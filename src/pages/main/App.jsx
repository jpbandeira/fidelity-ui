import './App.css';
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useSearchParams,
  useNavigate
} from "react-router-dom";

import Menu from '../../components/menu/Menu';
import Client from '../client/Client';
import Login from '../login/Login';
import Appointment from '../appointment/Appointment';

import { ClientProvider } from '../../contexts/client/Provider';

import { login, register } from '../../data/services/authentication.js';
import { decodeJWT } from '../../utils/token.js';

import { useSession } from '../../contexts/session/Context.js';

function App() {
  const navigate = useNavigate()
  const { userSession, switchUserSession } = useSession()
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let token = searchParams.get('token')

    if (token !== null) {
      navigate('/login', { replace: true });
      var tokenClaims = decodeJWT(token)
      if (tokenClaims.payload !== null && tokenClaims.payload !== undefined) {
        var payload = tokenClaims.payload
        switchUserSession({ email: payload.email, name: payload.name, id: payload.sub })
      }
    }
  }, [searchParams, switchUserSession, navigate])

  const handleLogin = async (email, password) => {
    var body = await login({ "email": email, "password": password })
    if (body !== null) {
      var tokenClaims = decodeJWT(body.token)
      if (tokenClaims.payload !== null && tokenClaims.payload !== undefined) {
        var payload = tokenClaims.payload
        switchUserSession({ email: payload.email, name: payload.name, id: payload.sub })
      }
    }
  }

  return (
    <div className="body">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            userSession
              ? <Navigate to="/client" />
              : <Login onLogin={handleLogin} />
          }
        />

        {userSession ?
          (
            <Route
              path="/*"
              element={
                <div>
                  <div className="header" id="start">
                    <div className="header-content">
                      <ClientProvider>
                        <Menu />
                      </ClientProvider>
                    </div>
                  </div>
                  <div className="content">
                    <ClientProvider>
                      <Routes>
                        <Route path="/client" element={<Client />} />
                        <Route path="/appointment" element={<Appointment />} />
                      </Routes>
                    </ClientProvider>
                  </div>
                </div>
              }
            />
          )
          :
          <Route path="/client" element={<Navigate to="/login" replace />} />
        }
      </Routes>
    </div>
  );
}

export default App;
