import { authenticationAPI, handleResponse } from "./api"


export const login = async (body) => {
    return await handleResponse(authenticationAPI.post, '/login', body)
}

export const register = async (body) => {
    return await handleResponse(authenticationAPI.post, '/user/register', body)
}

export const getUserByEmail = async (email) => {
    return await handleResponse(authenticationAPI.get, `/user/${email}`)
}