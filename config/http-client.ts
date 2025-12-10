import axios from "axios";
import { getAuthToken } from "@/store/local-storage";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const httpClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
httpClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});