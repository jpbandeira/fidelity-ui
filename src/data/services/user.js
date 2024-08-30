import api from "./api"

const endpoint = '/users'

export const listUsers = (key, value) => {
    let listEndpoint = endpoint
    if (value) {
        var queryParam = key + "=" + value
        listEndpoint = listEndpoint + "?" + queryParam
    }

    return api.get(listEndpoint)
}

export const createUser = async (body) => {
    return api.post(endpoint, body);
}

export const deleteUser = async (id) => {
    if (id) {
        return api.delete(endpoint + "/" + id);
    }
}
