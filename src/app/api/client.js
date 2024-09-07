import axios from "axios";

const baseURL = "http://yhcho.ddns.net:8082";

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

const getAuthHeader = () => {
  const storage = getLocalStorage();
  if (storage) {
    const jwt = storage.getItem("jwt");
    return jwt ? `Bearer ${jwt}` : null;
  }
  return null;
};

const client = axios.create({
  baseURL,
  headers: {
    withCredentials: true,
  },
});

// Add an interceptor to set the Authorization header before each request
client.interceptors.request.use((config) => {
  const authHeader = getAuthHeader();
  if (authHeader) {
    config.headers.Authorization = authHeader;
  }
  return config;
});

export function applyToken(jwt) {
  const storage = getLocalStorage();
  if (storage) {
    storage.setItem("jwt", jwt);
  }
}

export function clearToken() {
  const storage = getLocalStorage();
  if (storage) {
    storage.removeItem("jwt");
  }
}

export default client;
