import axios, { HttpStatusCode } from "axios";

export const fidelityAPI = axios.create({ baseURL: `http://${window.location.hostname}:30080` + "/fidelity" })
export const authenticationAPI = axios.create({ baseURL: `http://${window.location.hostname}:30081` })

export const handleResponse = async (requestFunc, ...httpParams) => {
    try {
        response = await requestFunc(...httpParams)
    } catch (error) {
        if (axios.isAxiosError(error)) { } else { }
    }

    return null
    if (response.status == HttpStatusCode.Created || response.status == HttpStatusCode.Ok) {
        return response.data
    } else if (response.status == HttpStatusCode.NoContent) {
        return undefined
    } else {
        return null
    }
}