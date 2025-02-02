import api from "./api"
import { buildArgs } from "./common"

const endpoint = '/clients'

export const listClients = async (args) => {
    return await api.get(endpoint + buildArgs(args))
}

export const createClient = async (body) => {
    return await api.post(endpoint, body);
}

export const updateClient = async (id, body) => {
    return await api.put(endpoint, body);
}

export const deleteClient = async (id) => {
    if (id !== null && id !== "") {
        return await api.delete(endpoint + "/" + id);
    }
}
