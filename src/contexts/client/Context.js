import { useContext, createContext } from 'react'

export const ClientContext = createContext();

export const useClient = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClient should be used insid a ClientProvider');
    }
    return context;
};
