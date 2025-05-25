import axios, { HttpStatusCode } from "axios";

const apiHost = "http://10.0.0.102:30080"
const baseURL = "/fidelity"

export const api = axios.create({ baseURL: apiHost + baseURL })

export const handleResponse = async (response) => {
    response = await response
    if (response.status == HttpStatusCode.Created || response.status == HttpStatusCode.Ok) {
        return response.data
    } else if (response.status == HttpStatusCode.NoContent) {
        return undefined
    } else {
        return null
    }
}