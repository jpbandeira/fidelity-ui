import { fidelityAPI, handleResponse } from "./api"
import { buildArgs } from "./common"

const endpoint = '/attendants'

export const listAttendants = async (args) => {
    return await handleResponse(fidelityAPI.get(endpoint + buildArgs(args)))
}

export const createAttendant = async (body) => {
    return await handleResponse(fidelityAPI.post(endpoint, body))
}

export const updateAttendant = async (id, body) => {
    return await handleResponse(fidelityAPI.put(endpoint, body))
}

export const deleteAttendant = async (id) => {
    if (id !== null && id !== "") {
        return await handleResponse(fidelityAPI.delete(endpoint + "/" + id))
    }
}
