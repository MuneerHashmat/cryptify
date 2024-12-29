import axios from "axios";
import { API_KEY } from "./apiKey";

export const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins/",
  timeout: 5000,
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
});
