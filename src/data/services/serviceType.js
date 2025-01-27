import api from "./api"
import { buildArgs } from "./common"

const endpoint = '/service-types'

export const listServiceType = async (args) => {
    return api.get(endpoint + buildArgs(args))
}
