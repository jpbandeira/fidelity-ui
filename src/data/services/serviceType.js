import { api, handleResponse } from "./api"
import { buildArgs } from "./common"

const endpoint = '/service-types'

export const listServiceTypes = async (args) => {
    return handleResponse(api.get(endpoint + buildArgs(args)))
}
