"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Controls,
  Panel,
  useStoreApi,
  useReactFlow,
  ReactFlowProvider,
  ConnectionLineType,
  SelectionMode,
} from "@xyflow/react";
import { shallow } from "zustand/shallow";

import MindMapNode from "@/components/MindMapNode";
import MindMapEdge from "@/components/MindMapEdge";
import "@xyflow/react/dist/style.css";
import useStore from "./store";
import Dagre from "@dagrejs/dagre";

const getLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: options.direction,
    align: "UL",
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  // console.log(nodes);
  nodes.forEach((node) =>
    g.setNode(node.id, {
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - node.measured.width / 2;
      const y = position.y;
      console.log();

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
  setNodes: state.setNodes,
});

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

function Flow() {
  // whenever you use multiple values, you should use shallow for making sure that the component only re-renders when one of the values change
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode, setNodes } =
    useStore(selector, shallow);
  const connectingNodeId = useRef(null);
  const store = useStoreApi();
  const { screenToFlowPosition } = useReactFlow();

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });
      // console.log(layouted);
      setNodes(layouted.nodes);

      // window.requestAnimationFrame(() => {
      //   fitView();
      // });
    },
    [nodes, edges]
  );

  const getChildNodePosition = (event, parentNode) => {
    const { domNode } = store.getState();

    if (
      !domNode ||
      // we need to check if these properites exist, because when a node is not initialized yet,
      // it doesn't have a positionAbsolute nor a width or height
      !parentNode?.internals.positionAbsolute ||
      !parentNode?.measured.width ||
      !parentNode?.measured.height
    ) {
      return;
    }

    const isTouchEvent = "touches" in event;
    const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
    // we need to remove the wrapper bounds, in order to get the correct mouse position
    const panePosition = screenToFlowPosition({
      x,
      y,
    });

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x:
        panePosition.x -
        parentNode.internals.positionAbsolute.x +
        parentNode.measured.width / 2,
      y:
        panePosition.y -
        parentNode.internals.positionAbsolute.y +
        parentNode.measured.height / 2,
    };
  };

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const { nodeLookup } = store.getState();
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane && connectingNodeId.current) {
        const parentNode = nodeLookup.get(connectingNodeId.current);
        const childNodePosition = getChildNodePosition(event, parentNode);

        if (parentNode && childNodePosition) {
          addChildNode(parentNode, childNodePosition);
        }
      }
    },
    [getChildNodePosition]
  );
  const panOnDrag = [1, 2];
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
      panOnScroll
      selectionOnDrag
      panOnDrag={panOnDrag}
      selectionMode={SelectionMode.Partial}
      // width={"50%"}
      // style={{ position: "absolute", right: 0 }}
    >
      <Controls showInteractive={false} />
      <Panel position="top-left" className="header"></Panel>
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
}
const SideBar = () => {
  const { nodes } = useStore();
  const [keyword, setKeyword] = useState("");
  return (
    <div className="sidebar">
      <input value={keyword} onChange={(evt) => setKeyword(evt.target.value)} />
      <ul>
        {keyword === ""
          ? nodes.map((item, idx) => <li key={idx}>{item.data.label}</li>)
          : nodes
              .filter((text) => text.data.label.includes(keyword))
              .map((item, idx) => <li key={idx}>{item.data.label}</li>)}
      </ul>
      <div>단어 갯수 : {nodes.length}</div>
    </div>
  );
};
export default function Page() {
  return (
    <ReactFlowProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SideBar />
        <Flow />
      </div>
    </ReactFlowProvider>
  );
}
