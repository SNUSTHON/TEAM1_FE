import { useMutation } from "react-query";
import {
  createCard,
  createCardMemo,
  expandCard,
  getCard,
  getCardMemo,
  getMemoFavorites,
  removeCardMemo,
  toggleMemoFavorites,
  updateCardMemo,
} from "../api/card";

export function useCreateMainCard() {
  const mutation = useMutation(createCard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? "카드 생 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useExpandCard() {
  const mutation = useMutation(expandCard, {
    onSuccess: (data, variables) => {
      console.log(data);
      variables.callback(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "카드 확장 실패";
      console.error(message);
    },
  });
  return mutation;
}
export function useGetCard() {
  const mutation = useMutation(getCard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? "카 조회 실패";
      consol장.error(message);
    },
  });
  return mutation;
}

export function useCreateCardMemo() {
  const mutation = useMutation(createCardMemo, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "카드 메도 생성 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useGetCardMemo() {
  const mutation = useMutation(getCardMemo, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "카드 메모 조회 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useUpdateCardMemo() {
  const mutation = useMutation(updateCardMemo, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "카드 메모 수정 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useRemoveCardMemo() {
  const mutation = useMutation(removeCardMemo, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "카드 메모 삭제 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useGetMemoFavorites() {
  const mutation = useMutation(getMemoFavorites, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "즐겨찾기 조회 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useToggleMEmoFavorites() {
  const mutation = useMutation(toggleMemoFavorites, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "즐겨찾기 토글 실패";
      console.error(message);
    },
  });
  return mutation;
}
