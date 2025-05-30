import React, { useState, useMemo } from 'react';
import { ClientContext } from './Context';

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  const value = useMemo(() => ({
    client,
    switchClient: setClient,
  }), [client]);

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};
