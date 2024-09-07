"use client";
import React, { useState } from "react";
import "./App.css";
import Image from "next/image";
import useLogin from "../hooks/useLogin";

export default function Page() {
  const { mutate: login, isLoading, isSuccess } = useLogin();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const onSubmit = async () => {
    event.preventDefault();
    if (username && password) login({ username, password });
  };
  return (
    <div className="container">
      <div className="left-section">
        <div className="logo">logo</div>
        <h1>
          반가워요!
          <br />
          반대 의견을 보여주는 <span className="highlight">Thinkwave</span>
          입니다
          <br />
          무한한 상상력을 키워봐요
        </h1>
        <form className="login-form">
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
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/">Forgot Password?</a>
          </div>
          <div className="buttons">
            <button type="submit" className="login-btn" onClick={onSubmit}>
              Login
            </button>
            <button type="button" className="signup-btn">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="right-section">
        <Image
          src={require("./login.svg")}
          alt="Right Section Background"
          className="right-image"
        />
      </div>
    </div>
  );
}
