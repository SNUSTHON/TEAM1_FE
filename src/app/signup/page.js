"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import Image from "next/image";
import useRegister from "../hooks/useRegister";
import { useRouter } from "next/navigation";

export default function App() {
  const { mutate: register, isLoading, isSuccess } = useRegister();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const onSubmit = async () => {
    event.preventDefault();
    if (!isLoading) {
      if (username && password && email && password === confirmPassword)
        await register({ username, password, email });
      if (isSuccess) {
        router.push("/login");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h1 className="h1">시작해볼까요?</h1>
        <form className={styles.signupForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(evt) => setConfirmPassword(evt.target.value)}
            />
          </div>
          <button type="submit" className={styles.signupBtn} onClick={onSubmit}>
            Sign Up
          </button>
        </form>
      </div>
      <div className={styles.rightSection}>
        <Image
          src={require("../login/login.png")}
          alt="Background"
          className={styles.rightImage}
        />
      </div>
    </div>
  );
}
