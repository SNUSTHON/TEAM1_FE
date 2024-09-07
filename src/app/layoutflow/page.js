"use client";
import React, { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";

import { initialNodes, initialEdges } from "./nodes-edges.js";
import "@xyflow/react/dist/style.css";

const getLayoutedElements = (nodes, edges) => {
  return { nodes, edges };
};

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges);

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  );
};

export default function Layout() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <LayoutFlow />
    </div>
  );
}
