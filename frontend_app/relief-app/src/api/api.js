import axios from "axios";

const api = axios.create({
  baseURL: "http://10.252.60.128:5000/api", // ⚠️ use your PC IP, not localhost
});

// Attach token automatically
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;