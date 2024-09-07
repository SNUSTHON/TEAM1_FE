"use client"; // Mark the file as a Client Component

import React, { useState } from "react";
import styles from "./onboarding.module.css";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export default function Page() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const router = useRouter();

  const handleTransition = (e) => {
    e.preventDefault();
    setIsFadingOut(true);
    setTimeout(() => {
      router.push("/login");
    }, 1000); // Delay for the length of the fade-out animation
  };

  return (
    <div className={`${styles.app} ${isFadingOut ? styles.fadeOut : ""}`}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Think wave</h1>
        <p className={styles.description}>
          ThinkWave는 휴리스틱을 방지하고자 반대 의견 및 주제를 제시하는 확장형
          메모 서비스입니다.
        </p>
        <a className={styles.getStartedBtn} href="/login" onClick={handleTransition}>
          Get started
        </a>
      </div>
    </div>
  );
}