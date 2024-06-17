import axios from "axios";

// TODO: можно перенести в .env
const EXMO_API_URL = "https://api.binance.com/api/v3";

export const EXMO_API = axios.create({
  baseURL: EXMO_API_URL
});