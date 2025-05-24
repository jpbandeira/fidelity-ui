import { api, handleResponse } from "./api"
import { buildArgs } from "./common"

const endpoint = '/attendants'

export const listAttendants = async (args) => {
    return await handleResponse(api.get(endpoint + buildArgs(args)))
}

export const createAttendant = async (body) => {
    return await handleResponse(api.post(endpoint, body))
}

export const updateAttendant = async (id, body) => {
    return await handleResponse(api.put(endpoint, body))
}

export const deleteAttendant = async (id) => {
    if (id !== null && id !== "") {
        return await handleResponse(api.delete(endpoint + "/" + id))
    }
}
