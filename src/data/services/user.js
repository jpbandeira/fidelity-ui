import api from "./api"

export const listUsers = (key, value) => {
    console.log(value)
    var endpoint = '/users'
    var queryParam = key + "=" + value

    if (value) {
        endpoint = endpoint + "?" + queryParam
    }
    console.log(endpoint)

    return api.get(endpoint)
}
