"use client";
import React from "react";
import {
  useCreateCanvas,
  useReadCanvas,
  useReadCanvases,
  useRemoveCanvas,
  useUpdateCanvas,
} from "../hooks/useCanvas";
import {
  useCreateCardMemo,
  useCreateMainCard,
  useExpandCard,
  useGetCard,
  useGetCardMemo,
  useGetMemoFavorites,
  useRemoveCardMemo,
  useToggleMEmoFavorites,
  useUpdateCardMemo,
} from "../hooks/useCard";
import { readCanvas } from "../api/canvases";

export default function Page() {
  const { mutate: createCanvas } = useCreateCanvas();
  const { mutate: readCanvases } = useReadCanvases();
  const { mutate: updateCanvas } = useUpdateCanvas();
  const { mutate: removeCanvas } = useRemoveCanvas();
  const { mutate: createCard } = useCreateMainCard();
  const { mutate: expandCard } = useExpandCard();
  const { mutate: getCard } = useGetCard();
  const { mutate: createCardMemo } = useCreateCardMemo();
  const { mutate: getCardMemo } = useGetCardMemo();
  const { mutate: updateCardMemo } = useUpdateCardMemo();
  const { mutate: removeCardMemo } = useRemoveCardMemo();
  const { mutate: getMemoFavorites } = useGetMemoFavorites();
  const { mutate: toggleMemoFavorites } = useToggleMEmoFavorites();
  const jwt = localStorage.getItem("jwt");
  console.log(jwt);
  return (
    <>
      <button
        onClick={async () => {
          await createCanvas("하이");
        }}
      >
        캔버스 생성
      </button>

      <button
        onClick={async () => {
          await readCanvases();
        }}
      >
        캔버스 전체 조회
      </button>
      <button
        onClick={async () => {
          await readCanvas("하이");
        }}
      >
        캔버스 조회
      </button>
      <button
        onClick={async () => {
          await updateCanvas("하이");
        }}
      >
        캔버스 수정
      </button>
      <button
        onClick={async () => {
          await removeCanvas();
        }}
      >
        캔버스 삭제
      </button>
      <button
        onClick={async () => {
          await createCard({ canvasId: 76, content: "하이의 캔버스" });
        }}
      >
        카드 생성
      </button>
      <button
        onClick={async () => {
          await expandCard(77);
        }}
      >
        카드 확장
      </button>
      <button
        onClick={async () => {
          await getCard(77);
        }}
      >
        카드 조회
      </button>
      <button
        onClick={async () => {
          await createCardMemo({ cardId: "213", content: "하이하이" });
        }}
      >
        메모 생성
      </button>
      <button
        onClick={async () => {
          await getCardMemo(77);
        }}
      >
        메모 조
      </button>
      <button
        onClick={async () => {
          await updateCardMemo("하이");
        }}
      >
        메모 수정
      </button>
      <button
        onClick={async () => {
          await removeCardMemo("하이");
        }}
      >
        메모 제거
      </button>
      <button
        onClick={async () => {
          await getMemoFavorites("하이");
        }}
      >
        즐겨찾기 조회
      </button>
      <button
        onClick={async () => {
          await toggleMemoFavorites("하이");
        }}
      >
        즐겨찾기 토글
      </button>
    </>
  );
}
