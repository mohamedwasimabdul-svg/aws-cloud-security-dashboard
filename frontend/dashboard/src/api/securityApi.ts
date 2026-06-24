import axios from "axios";

const api = axios.create({
  baseURL:
    "https://jr2qzd7w9a.execute-api.eu-central-1.amazonaws.com/dev"
});

export const getSummary = async () => {

  const response =
    await api.get("/summary");

  return response.data;
};

export const getFindings = async () => {

  const response =
    await api.get("/findings");

  return response.data;
};

export const getHistory = async () => {

  const response =
    await api.get("/history");

  return response.data;
};

export const getLifecycle = async () => {

  const response =
    await api.get("/lifecycle");

  return response.data;
};

export default api;