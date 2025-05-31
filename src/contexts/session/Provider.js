import React, { useState, useEffect, useMemo } from 'react';
import { SessionContext } from './Context';

export const SessionProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(() => {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  });

  useEffect(() => {
    if (userSession) {
      localStorage.setItem('userSession', JSON.stringify(userSession));
    } else {
      localStorage.removeItem('userSession');
    }
  }, [userSession]);

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
