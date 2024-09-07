"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useReadCanvases, useCreateCanvas } from "@/app/hooks/useCanvas";
import styles from "./files.module.css";

import defaultAvatarSvg from "./default-avatar.png";
import defaultCanvasSvg from "./default-canvas.png";
import { clearToken } from "../api/client";
import { useRouter } from "next/navigation";

export default function FilesClient() {
  const [username, setUsername] = useState("");
  const [canvases, setCanvases] = useState([]);
  const { mutate: readCanvases, data: canvasesData } = useReadCanvases();
  const { mutate: createCanvas } = useCreateCanvas();
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    readCanvases();
  }, [readCanvases]);

  useEffect(() => {
    if (canvasesData) {
      setCanvases(canvasesData);
    }
  }, [canvasesData]);

  const handleCreateCanvas = () => {
    createCanvas(
      { subject: "Untitled" },
      {
        onSuccess: () => readCanvases(),
      }
    );
  };

  return (
    <>
      <div className={styles.profileSection}>
        <Image
          src={defaultAvatarSvg}
          alt="Profile"
          width={60}
          height={60}
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <h2>반갑습니다 {username}님</h2>
          <p>오늘도 생각을 넓혀볼까요?</p>
        </div>
        <button className={styles.createMemoBtn}>+ New Idea</button>
      </div>

      <div className={styles.canvasGrid}>
        {canvases.map((canvas) => (
          <div key={canvas.id} className={styles.canvasItem}>
            <Image
              src={defaultCanvasSvg}
              alt={canvas.subject}
              width={300}
              height={200}
              className={styles.canvasImage}
            />
            <div className={styles.canvasInfo}>
              <h3 className={styles.canvasTitle}>{canvas.subject}</h3>
              <p className={styles.canvasDate}>
                Edited {new Date(canvas.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {[...Array(3)].map((_, index) => (
          <div
            key={`new-${index}`}
            className={`${styles.canvasItem} ${styles.newCanvas}`}
            onClick={handleCreateCanvas}
          >
            <div className={styles.newCanvasIcon}>+</div>
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        Copyright © SNUSTHON TEAM1(Thinkwave). All rights reserved.
        <button
          className={styles.btn}
          onClick={() => {
            clearToken();
            router.push("/onboarding");
            router.refresh();
          }}
        >
          Log out
        </button>
      </footer>
    </>
  );
}