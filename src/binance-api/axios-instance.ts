import axios from "axios";

// TODO: можно перенести в .env
const API_URL = "https://api.binance.com/api/v3";

export const API = axios.create({
  baseURL: API_URL
});