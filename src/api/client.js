import axios from "axios";

const baseURL = "http://43.202.249.224:8080";

const client = axios.create({
  baseURL,
});

export function applyToken(jwt) {
  client.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  delete client.defaults.headers.Authorization;
}

export default client;
