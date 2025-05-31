import { authenticationAPI, handleResponse } from "./api"


export const login = async (body) => {
    return await handleResponse(authenticationAPI.post, '/login', body)
}

export const register = async (body) => {
    return await handleResponse(authenticationAPI.post, '/register', body)
}