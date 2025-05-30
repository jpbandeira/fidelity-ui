import { useContext, createContext } from 'react'

export const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);
