import axios from "axios";

// TODO: можно перенести в .env
const API_URL = "https://api.exmo.me/v1.1";

export const API = axios.create({
  baseURL: API_URL
});