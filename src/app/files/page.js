import React from "react";
import Image from "next/image";
import Link from "next/link";
import FilesClient from "./FilesClient";
import styles from "./files.module.css";

import logoSvg from "./logo.png";

export default function Page() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={logoSvg} alt="Thinkwave" width={40} height={40} />
          <h1>Thinkwave</h1>
        </div>
        <Link href="/pricing" className={styles.pricingBtn}>
          요금제
        </Link>
      </header>

      <FilesClient />
    </div>
  );
}