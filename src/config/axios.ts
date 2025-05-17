import axios from "axios";

const { VITE_COINBASE_API_BASE_URL } = import.meta.env

export const coinbaseApi = axios.create({
  baseURL: VITE_COINBASE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
}) 