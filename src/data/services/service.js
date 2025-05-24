import { api, handleResponse } from "./api"
import { buildArgs } from "./common";

const servicesEndpoint = "/services"
const singleClientEndpoint = "/clients/"

export const createService = async (body) => {
  return await handleResponse(api.post(servicesEndpoint, body))
}

export const listServices = async (clientID, args) => {
  return await handleResponse(api.get(singleClientEndpoint + clientID + servicesEndpoint + buildArgs(args)))
}
