import client from "./client";

export async function register(reqBody) {
  const response = await client.post("/api/auth/register", reqBody);
  return response.data;
}

export async function login(reqBody) {
  localStorage.setItem("username", reqBody.username);
  const response = await client.post("/api/auth/login", reqBody);
  return response.data;
}
