import axios from "axios";

const baseURL = "http://yhcho.ddns.net:8082";

const client = axios.create({
  baseURL,
  headers: {
    withCredentials: true,
  },
});

export function applyToken(jwt) {
  client.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  delete client.defaults.headers.Authorization;
}

export default client;
