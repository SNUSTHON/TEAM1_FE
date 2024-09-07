import { useMutation } from "react-query";
import {
  createCanvas as create,
  readCanvas as read,
  readCanvases as readAll,
  readCanvasesSubject as readSubjects,
  removeCanvas as remove,
  updateCanvas as update,
} from "../api/canvases";
export function useCreateCanvas() {
  const mutation = useMutation(create, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "캔버스 생성 실패";
      console.error(message, error);
    },
  });
  return mutation;
}

export function useReadCanvas() {
  const mutation = useMutation(read, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "캔버스 조회 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useReadCanvases() {
  const mutation = useMutation(readAll, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "모든 캔버스 조회 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useReadSubjects() {
  const mutation = useMutation(readSubjects, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "캔버스 주제 조회 실패";
      console.error(message);
    },
  });
  return mutation;
}

export function useUpdateCanvas() {
  const mutation = useMutation(update, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "캔버스 수정 실패";
      console.error(message);
    },
  });
  return mutation;
}
export function useRemoveCanvas() {
  const mutation = useMutation(remove, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ??
        "캔버스 삭제 실패";
      console.error(message);
    },
  });
  return mutation;
}
