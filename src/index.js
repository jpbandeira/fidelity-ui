import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/main/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <body>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </body>
);
