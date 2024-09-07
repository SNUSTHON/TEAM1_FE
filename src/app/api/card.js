import client from "./client";

export async function createCard({ canvasId, content }) {
  const response = await client.post(
    `/api/cards/canvas/${canvasId}?content=${content}`
  );
  return response.data;
}

export async function expandCard(cardId) {
  const response = await client.post(`/api/cards/${cardId}/expand`);
  return response.data;
}

export async function getCard(cardId) {
  const response = await client.get(`/api/cards/${cardId}`);
  return response.data;
}

export async function createCardMemo({ cardId, content }) {
  const response = await client.post(
    `/api/cards/${cardId}/memos?content=${content}`
  );
  return response.data;
}
export async function getCardMemo(cardId) {
  const response = await client.get(`/api/cards/${cardId}/memos`);
  return response.data;
}
export async function updateCardMemo({ cardId, memoId, content }) {
  const response = await client.put(
    `/api/cards/${cardId}/memos/${memoId}?content=${content}`
  );
  return response.data;
}

export async function removeCardMemo({ cardId, memoId }) {
  const response = await client.delete(`/api/cards/${cardId}/memos/${memoId}`);
  return response.data;
}

export async function getMemoFavorites() {
  const response = await client.get(`/api/cards/favorites`);
  return response.data;
}

export async function toggleMemoFavorites(cardId) {
  const response = await client.post(
    `/api/cards/favorites/toggle?cardId=${cardId}`
  );
  return response.data;
}
