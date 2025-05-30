import './App.css';

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

import { login, register } from '../../data/services/authentication.js';
import { decodeJWT } from '../../utils/token.js';

import { useSession } from '../../contexts/session/Context.js';
import RequiredSession from "../../components/RequiredSession";

function App() {
  const { userSession, switchUserSession } = useSession()

  const handleLogin = async (email, password) => {
    var body = await login({ "email": email, "password": password })
    if (body.token !== null) {
      var tokenClaims = decodeJWT(body.token)
      if (tokenClaims.payload != null && tokenClaims.payload != undefined) {
        var payload = tokenClaims.payload
        switchUserSession({ email: payload.email, name: payload.name })
      }
    }
  }

  return (
    <div className="body">
      <BrowserRouter>
        <Routes>
          {/* Rota de login: sem menu */}
          <Route
            path="/"
            element={
              userSession
                ? <Navigate to="/client" />
                : <Login onLogin={handleLogin} />
            }
          />

          {userSession && (
            <Route
              path="/*"
              element={
                <RequiredSession>
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
                </RequiredSession>
              }
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
