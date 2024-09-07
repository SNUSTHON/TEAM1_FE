import React from 'react';
import './App.css';
import Image from 'next/image';

export default function App() {
  return (
    <div className="container">
      <div className="left-section">
        <h1>시작해볼까요?</h1>
        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input type="text" id="name" defaultValue="think wave" />
          </div>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" defaultValue="hakeem@digital.com" />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" defaultValue="************" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input type="password" id="confirm-password" defaultValue="************" />
          </div>
          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
      <div className="right-section">
        <Image src={require('../login/login.svg')} alt="Background" className="right-image" />
      </div>
    </div>
  );
}