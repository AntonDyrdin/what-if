import axios from "axios";

// TODO: можно перенести в .env
const API_URL = "https://www.okx.com/api/v5";

export const API = axios.create({
  baseURL: API_URL
});