import { useMutation } from "react-query";
import { applyToken } from "../api/client";
import { register } from "../api/auth";

export default function useRegister() {
  const mutation = useMutation(register, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      const message =
        error.response?.data?.data?.[0]?.messages[0].message ?? "회원가입 실패";
      console.error(message);
    },
  });
  return mutation;
}
