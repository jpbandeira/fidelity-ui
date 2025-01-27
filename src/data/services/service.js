import api from "./api"
import { buildArgs } from "./common";

const servicesEndpoint = "/services"
const singleClientEndpoint = "/clients/"

export const createServices = async (body) => {
  api.post(servicesEndpoint, body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export const listServices = (clientID, args) => {
  return api.get(singleClientEndpoint + clientID + servicesEndpoint + buildArgs(args))
}
