import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/main/App';
import { SessionProvider } from './contexts/session/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </React.StrictMode>
);
