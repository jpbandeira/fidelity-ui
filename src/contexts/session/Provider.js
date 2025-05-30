import React, { useState, useMemo } from 'react';
import { SessionContext } from './Context';

export const SessionProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  const value = useMemo(() => ({
    userSession,
    switchUserSession: setUserSession,
  }), [userSession]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
