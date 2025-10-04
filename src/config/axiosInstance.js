import axios from "axios";


export const api = axios.create({
  baseURL: "https://cryptify-blue.vercel.app",
  timeout: 5000,
});
