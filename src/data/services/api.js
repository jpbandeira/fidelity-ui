import axios from "axios";

const apiHost = "http://localhost:9901"
const baseURL = "/fidelity"

const api = axios.create({ baseURL: apiHost + baseURL })

export default api
