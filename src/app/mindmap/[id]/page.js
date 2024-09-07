"use client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import MindMapFlow from "./MindMapFlow";

export default function MindMapPage({ params }) {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <MindMapFlow params={params} />
      </div>
    </ReactFlowProvider>
  );
}