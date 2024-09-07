import React from 'react';
import './App.css';

export default function App() {
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Pricing</h1>
      <div className="pricing-cards">
        {/* Basic Plan */}
        <div className="card basic-card">
          <h2>Basic</h2>
          <p className="price">Free</p>
          <p>월간청구</p>
          <ul>
            <li>✔ 하루 명제 생성 횟수 <strong>15회</strong></li>
            <li>✔ 슬롯 최대 4개까지 가능</li>
            <li>✔ 등록 기기 최대 1개</li>
          </ul>
        </div>
        {/* Professional Plan */}
        <div className="card professional-card">
          <h2>Professional</h2>
          <p className="price">15,000 ₩</p>
          <p>월간청구</p>
          <ul>
            <li>✔ 하루 명제 생성 횟수 <strong>20회</strong></li>
            <li>✔ 슬롯 <strong>무제한</strong> 이용 가능</li>
            <li>✔ <strong>PDF로</strong> 일괄 내보내기</li>
          </ul>
          <button className="btn professional-btn">Get Professional</button>
        </div>
        {/* Team Plan */}
        <div className="card team-card">
          <h2>Team</h2>
          <p className="price">25,000 ₩</p>
          <p>월간청구</p>
          <ul>
            <li>✔ 하루 명제 생성 횟수 <strong>무제한</strong></li>
            <li>✔ 슬롯 <strong>무제한</strong> 이용 가능</li>
            <li>✔ <strong>PDF로</strong> 일괄 내보내기</li>
            <li>✔ 워크스페이스 애널리틱스 제공</li>
          </ul>
          <button className="btn team-btn">Get Team Plan</button>
        </div>
      </div>
    </div>
  );
}
