import axios, { HttpStatusCode } from "axios";

export const fidelityAPI = axios.create({ baseURL: `http://${window.location.hostname}:30080/fidelity` })
export const authenticationAPI = axios.create({ baseURL: `http://${window.location.hostname}:30081/authentication` })

export const handleResponse = async (requestFunc, ...httpParams) => {
    try {
        var response = await requestFunc(...httpParams)
        if (response.status === HttpStatusCode.Created || response.status === HttpStatusCode.Ok) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        if (axios.isAxiosError(error)) { } else { }
    }

    return null
}