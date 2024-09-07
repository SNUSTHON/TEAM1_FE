"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useReadCanvases, useCreateCanvas } from "@/app/hooks/useCanvas";

import defaultAvatarSvg from "./default-avatar.png";
import defaultCanvasSvg from "./default-canvas.png";
import { clearToken } from "../api/client";

export default function FilesClient() {
  const [username, setUsername] = useState("");
  const [canvases, setCanvases] = useState([]);
  const { mutate: readCanvases, data: canvasesData } = useReadCanvases();
  const { mutate: createCanvas } = useCreateCanvas();

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
      <div className="profile-section">
        <Image
          src={defaultAvatarSvg}
          alt="Profile"
          width={60}
          height={60}
          className="profile-image"
        />
        <div className="profile-info">
          <h2>반갑습니다 {username}님</h2>
          <p>오늘도 생각을 넓혀볼까요?</p>
        </div>
        <button className="create-memo-btn">+ New Idea</button>
      </div>

      <div className="canvas-grid">
        {canvases.map((canvas) => (
          <div key={canvas.id} className="canvas-item">
            <Image
              src={defaultCanvasSvg}
              alt={canvas.subject}
              width={300}
              height={200}
              className="canvas-image"
            />
            <div className="canvas-info">
              <h3 className="canvas-title">{canvas.subject}</h3>
              <p className="canvas-date">
                Edited {new Date(canvas.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {[...Array(3)].map((_, index) => (
          <div
            key={`new-${index}`}
            className="canvas-item new-canvas"
            onClick={handleCreateCanvas}
          >
            <div className="new-canvas-icon">+</div>
          </div>
        ))}
      </div>
      <footer className="footer">
        Copyright © SNUSTHON TEAM1(Thinkwave). All rights reserved.
        <button className="btn" onClick={() => clearToken()}>
          Log out
        </button>
      </footer>
    </>
  );
}
