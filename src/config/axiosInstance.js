import axios from "axios";


export const api = axios.create({
  baseURL: "https://cryptify.koyeb.app/",
  timeout: 5000,
});
