import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/main/App';
import { SessionProvider } from './contexts/session/Provider';
import {
  BrowserRouter,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);
