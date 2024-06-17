import axios from "axios";

// TODO: можно перенести в .env
const EXMO_API_URL = "https://api.exmo.me/v1.1";

export const EXMO_API = axios.create({
  baseURL: EXMO_API_URL
});