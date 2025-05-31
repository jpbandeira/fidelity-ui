import { fidelityAPI, handleResponse } from "./api"
import { buildArgs } from "./common"

const endpoint = '/clients'

export const listClients = async (args) => {
    try {
        return await handleResponse(fidelityAPI.get, endpoint + buildArgs(args))
    } catch (error) {

    }
}

export const createClient = async (body) => {
    return await handleResponse(fidelityAPI.post(endpoint, body))
}

export const updateClient = async (id, body) => {
    return await handleResponse(fidelityAPI.put(endpoint, body))
}

export const deleteClient = async (id) => {
    if (id !== null && id !== "") {
        return await handleResponse(fidelityAPI.delete(endpoint + "/" + id))
    }
}
