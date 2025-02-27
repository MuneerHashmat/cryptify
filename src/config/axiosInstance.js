import axios from "axios";


export const api = axios.create({
  baseURL: "https://cryptify.up.railway.app",
  timeout: 5000,
});
