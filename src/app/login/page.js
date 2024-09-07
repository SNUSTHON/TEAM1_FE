"use client"; // 최상단에 추가합니다.

import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import useLogin from "../hooks/useLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const { mutate: login, isLoading, isSuccess } = useLogin();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isLoading && username && password) {
      await login({ username, password });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/files");
    }
  }, [isSuccess, router]);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>logo</div>
        <h1>
          반가워요!
          <br />
          반대 의견을 보여주는 <span className={styles.highlight}>Thinkwave</span>
          입니다
          <br />
          무한한 상상력을 키워봐요
        </h1>
        <form className={styles.loginForm}>
          <input
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            type="password"
            placeholder="Password"
          />
          <div className={styles.formOptions}>
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/">Forgot Password?</a>
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={styles.loginBtn} onClick={onSubmit}>
              Login
            </button>
            <Link href={"/signup"} className={styles.signupBtn}>
              Sign Up
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.rightSection}>
        <Image
          src={require("./login.png")}
          alt="Right Section Background"
          className={styles.rightImage}
        />
      </div>
    </div>
  );
}