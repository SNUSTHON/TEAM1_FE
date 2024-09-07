import client from "./client";

export async function createCanvas(reqBody) {
  const response = await client.post("/api/canvases", reqBody);
  return response.data;
}
export async function readCanvases() {
  const response = await client.get("/api/canvases");
  return response.data;
}
export async function readCanvas(id) {
  const response = await client.get(`/api/canvases/${id}`);
  return response.data;
}

export async function updateCanvas({ id, reqBody }) {
  const response = await client.put(`/api/canvases/${id}`, reqBody);
  return response.data;
}

export async function removeCanvas(id) {
  const response = await client.delete(`/api/canvases/${id}`);
  return response.data;
}

export async function readCanvasesSubject() {
  const response = await client.delete(`/api/canvases/subjects`);
  return response.data;
}
