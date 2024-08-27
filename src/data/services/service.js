import api from "./api"

export const createServices = async (body) => {
    api.post('/services', body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
}
