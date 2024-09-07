"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Panel,
  NodeToolbar,
  NodeResizer,
  SelectionMode,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { CustomNode } from "@/components/CustomNode";

const nodeTypes = { customNode: CustomNode };

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "customNode",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "2" },
    type: "customNode",
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      console.log(nodes);
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      console.log(edges);
    },
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const [variant, setVariant] = useState("cross");

  const [displayMode, setDisplayMode] = useState("system");

  const panOnDrag = [1, 2];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        colorMode={displayMode}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        panOnScroll
        selectionOnDrag
        panOnDrag={panOnDrag}
        nodeTypes={nodeTypes}
        selectionMode={SelectionMode.Partial}
      >
        <Background color="#ccc" variant={variant} gap={12} />
        <Panel position="bottom-center">
          <div>background:</div>
          <button onClick={() => setVariant("dots")}>dots</button>
          <button onClick={() => setVariant("lines")}>lines</button>
          <button onClick={() => setVariant("cross")}>cross</button>
          <button onClick={() => setVariant("")}>none</button>{" "}
        </Panel>
        <Panel position="top-center">
          <div>mode:</div>
          <button onClick={() => setDisplayMode("dark")}>dark</button>
          <button onClick={() => setDisplayMode("light")}>light</button>
          <button onClick={() => setDisplayMode("system")}>system</button>
        </Panel>
        <Controls />
        <NodeToolbar />
        <NodeResizer />
      </ReactFlow>
    </div>
  );
}
