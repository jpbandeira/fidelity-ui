import api from "./api"
import { buildArgs } from "./common"

const endpoint = '/clients'

export const listClients = (args) => {
    return api.get(endpoint + buildArgs(args))
}

export const createClient = async (body) => {
    return api.post(endpoint, body);
}

export const updateClient = async (id, body) => {
    return api.put(endpoint, body);
}

export const deleteClient = async (id) => {
    if (id !== null && id !== "") {
        return api.delete(endpoint + "/" + id);
    }
}
