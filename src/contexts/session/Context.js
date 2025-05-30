import { createContext, useContext } from 'react';

export const SessionContext = createContext();


export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession should be used insid a SessionContext');
    }
    return context;
};