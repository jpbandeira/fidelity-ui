import api from "./api"
import { buildArgs } from "./common"

const endpoint = '/attendants'

export const listAttendants = async (args) => {
    return api.get(endpoint + buildArgs(args))
}

export const createAttendant = async (body) => {
    return api.post(endpoint, body);
}

export const updateAttendant = async (id, body) => {
    return api.put(endpoint, body);
}

export const deleteAttendant = async (id) => {
    if (id !== null && id !== "") {
        return api.delete(endpoint + "/" + id);
    }
}
