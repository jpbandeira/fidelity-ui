import { fidelityAPI, handleResponse } from "./api"
import { buildArgs } from "./common"

const endpoint = '/service-types'

export const listServiceTypes = async (args) => {
    return handleResponse(fidelityAPI.get(endpoint + buildArgs(args)))
}
