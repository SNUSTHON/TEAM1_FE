import React from "react";
import "./App.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className="app">
      <div className="overlay">
        <h1>Think wave</h1>
        <p>
          ThinkWave는 휴리스틱을 방지하고자 반대 의견 및 주제를 제시하는 확장형
          메모 서비스입니다.
        </p>
        <Link className="get-started-btn" href="/login">
          Get started
        </Link>
      </div>
    </div>
  );
}
