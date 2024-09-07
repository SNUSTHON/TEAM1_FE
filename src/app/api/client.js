import axios from "axios";

const baseURL = "http://yhcho.ddns.net:8082";

const client = axios.create({
  baseURL,
  headers: {
    withCredentials: true,
    Authorization: localStorage.getItem("jwt")
      ? `Bearer ${localStorage.getItem("jwt")}`
      : null,
  },
});

export function applyToken(jwt) {
  localStorage.setItem("jwt", jwt);
  // client.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  localStorage.removeItem("jwt");
  delete client.defaults.headers.Authorization;
}

export default client;
