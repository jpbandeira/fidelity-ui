import { createContext } from 'react'

const ClientContext = createContext({
    switchClient: () => { },
    client: {
        id: '',
        name: '',
        email: '',
        phone: '',
    },
})

export default ClientContext