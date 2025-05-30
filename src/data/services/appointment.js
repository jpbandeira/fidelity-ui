import { fidelityAPI, handleResponse } from "./api"
import { buildArgs } from "./common";

const servicesEndpoint = "/appointments/services"
const appointmentsEndpoint = "/appointments"

export const createAppointment = async (body) => {
  return await handleResponse(fidelityAPI.post(appointmentsEndpoint, body))
}

export const listServices = async (args) => {
  return await handleResponse(fidelityAPI.get(servicesEndpoint + buildArgs(args)))
}
