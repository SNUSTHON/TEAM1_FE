import React from "react";
import styles from "./onboarding.module.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.app}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Think wave</h1>
        <p className={styles.description}>
          ThinkWave는 휴리스틱을 방지하고자 반대 의견 및 주제를 제시하는 확장형
          메모 서비스입니다.
        </p>
        <Link className={styles.getStartedBtn} href="/login">
          Get started
        </Link>
      </div>
    </div>
  );
}
