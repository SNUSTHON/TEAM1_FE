import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import dagre from "dagre";
import "@xyflow/react/dist/style.css";

import { useReadCanvas } from "@/app/hooks/useCanvas";
import MindMapNode from "@/components/MindMapNode";
import MindMapEdge from "@/components/MindMapEdge";

const nodeTypes = {
  mindmap: MindMapNode,
};

const edgeTypes = {
  mindmap: MindMapEdge,
};

const nodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: "#F6AD55", strokeWidth: 3 };
const defaultEdgeOptions = { style: connectionLineStyle, type: "mindmap" };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 200, height: 50 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWithPosition.width / 2,
      y: nodeWithPosition.y - nodeWithPosition.height / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export default function MindMapFlow({ params }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { mutate: readCanvas, data: canvasData, isLoading } = useReadCanvas();
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (params.id) {
      readCanvas(params.id);
    }
  }, [params.id, readCanvas]);

  useEffect(() => {
    if (canvasData) {
      const newNodes = [];
      const newEdges = [];

      function processCard(card, parentId = null) {
        const node = {
          id: card.id.toString(),
          type: 'mindmap',
          data: { label: card.content },
          position: { x: 0, y: 0 },
        };
        newNodes.push(node);

        if (parentId) {
          newEdges.push({
            id: `e${parentId}-${card.id}`,
            source: parentId.toString(),
            target: card.id.toString(),
            type: 'mindmap',
          });
        }

        card.childCards.forEach(childCard => processCard(childCard, card.id));
      }

      if (canvasData.rootCard) {
        processCard(canvasData.rootCard);
      }

      const layoutedElements = getLayoutedElements(newNodes, newEdges);
      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);

      setTimeout(() => fitView(), 0);
    }
  }, [canvasData, setNodes, setEdges, fitView]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodeOrigin={nodeOrigin}
      connectionLineStyle={connectionLineStyle}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.Straight}
      fitView
    >
      <Controls />
      <Background />
      <Panel position="top-left">Canvas: {canvasData?.subject}</Panel>
    </ReactFlow>
  );
}