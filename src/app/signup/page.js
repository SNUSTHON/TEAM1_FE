"use client";
import React, { useState } from "react";
import "./App.css";
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
    <div className="container">
      <div className="left-section">
        <h1>시작해볼까요?</h1>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(evt) => setConfirmPassword(evt.target.value)}
            />
          </div>
          <button type="submit" className="signup-btn" onClick={onSubmit}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="right-section">
        <Image
          src={require("../login/login.svg")}
          alt="Background"
          className="right-image"
        />
      </div>
    </div>
  );
}
