import { useMutation } from "react-query";
import { applyToken } from "../api/client";
import { login } from "../api/auth";

export default function useLogin() {
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      applyToken(data.data.accessToken);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? "로그인 실패";
      console.error(message);
    },
  });
  return mutation;
}
