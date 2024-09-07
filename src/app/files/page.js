import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FilesClient from './FilesClient';
import './App.css';

import logoSvg from './logo.png';

export default function Page() {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <Image src={logoSvg} alt="Thinkwave" width={40} height={40} />
          <h1>Thinkwave</h1>
        </div>
        <Link href="/pricing" className="pricing-btn">
          요금제
        </Link>
      </header>

      <FilesClient />

      <footer className="footer">
        Copyright © SNUSTHON TEAM1(Thinkwave). All rights reserved.
      </footer>
    </div>
  );
}