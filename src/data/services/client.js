import { api, handleResponse } from "./api"
import { buildArgs } from "./common"

const endpoint = '/clients'

export const listClients = async (args) => {
    return await handleResponse(api.get(endpoint + buildArgs(args)))
}

export const createClient = async (body) => {
    return await handleResponse(api.post(endpoint, body))
}

export const updateClient = async (id, body) => {
    return await handleResponse(api.put(endpoint, body))
}

export const deleteClient = async (id) => {
    if (id !== null && id !== "") {
        return await handleResponse(api.delete(endpoint + "/" + id))
    }
}
