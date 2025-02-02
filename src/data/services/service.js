import api from "./api"
import { buildArgs } from "./common";

const servicesEndpoint = "/services"
const singleClientEndpoint = "/clients/"

export const createServices = async (body) => {
  return await api.post(servicesEndpoint, body);
}

export const listServices = async (clientID, args) => {
  return await api.get(singleClientEndpoint + clientID + servicesEndpoint + buildArgs(args))
}
