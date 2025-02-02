import api from "./api"
import { buildArgs } from "./common"

const endpoint = '/attendants'

export const listAttendants = async (args) => {
    return await api.get(endpoint + buildArgs(args))
}

export const createAttendant = async (body) => {
    return await api.post(endpoint, body);
}

export const updateAttendant = async (id, body) => {
    return await api.put(endpoint, body);
}

export const deleteAttendant = async (id) => {
    if (id !== null && id !== "") {
        return await api.delete(endpoint + "/" + id);
    }
}
