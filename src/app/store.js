import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { nanoid } from "nanoid/non-secure";

const useStore = createWithEqualityFn((set, get) => ({
  nodes: [
    {
      id: "root",
      type: "mindmap",
      data: {
        label: "React Flow Mind Map",
        onInitial: () => {
          console.log(1);
        },
      },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addChildNode: (parentNode, data, position) => {
    const newAgreeNode1 = {
      id: data[0].id,
      type: "mindmap",
      data: {
        label: data[0].content,
        childCards: data[0].childCards,
        memos: data[0].memos,
      },
      position: {
        x: position.x + 50,
        y: position.y - 40,
      },
      parentId: parentNode.id,
    };
    const newAgreeNode2 = {
      id: data[1].id,
      type: "mindmap",
      data: {
        label: data[1].content,
        childCards: data[1].childCards,
        memos: data[1].memos,
      },
      position: {
        x: position.x + 50,
        y: position.y - 20,
      },
      parentId: parentNode.id,
    };
    const newNeutralNode = {
      id: data[2].id,
      type: "mindmap",
      data: {
        label: data[2].content,
        childCards: data[2].childCards,
        memos: data[2].memos,
      },
      position: {
        x: position.x + 50,
        y: position.y - 0,
      },
      parentId: parentNode.id,
    };
    const newDisagreeNode1 = {
      id: data[3].id,
      type: "mindmap",
      data: {
        label: data[3].content,
        childCards: data[3].childCards,
        memos: data[3].memos,
      },
      position: {
        x: position.x + 50,
        y: position.y + 20,
      },
      parentId: parentNode.id,
    };

    const newDisagreeNode2 = {
      id: data[4].id,
      type: "mindmap",
      data: {
        label: data[4].content,
        childCards: data[4].childCards,
        memos: data[4].memos,
      },
      position: {
        x: position.x + 50,
        y: position.y + 40,
      },
      parentId: parentNode.id,
    };

    const newAgreeEdge1 = {
      id: nanoid(),
      source: parentNode.id,
      target: newAgreeNode1.id,
    };
    const newAgreeEdge2 = {
      id: nanoid(),
      source: parentNode.id,
      target: newAgreeNode2.id,
    };

    const newNeutralEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNeutralNode.id,
    };

    const newDisagreeEdge1 = {
      id: nanoid(),
      source: parentNode.id,
      target: newDisagreeNode1.id,
    };

    const newDisagreeEdge2 = {
      id: nanoid(),
      source: parentNode.id,
      target: newDisagreeNode2.id,
    };

    // 상태 업데이트
    set({
      nodes: [
        ...get().nodes,
        newAgreeNode1,
        newAgreeNode2,
        newNeutralNode,
        newDisagreeNode1,
        newDisagreeNode2,
      ],
      edges: [
        ...get().edges,
        newAgreeEdge1,
        newAgreeEdge2,
        newNeutralEdge,
        newDisagreeEdge1,
        newDisagreeEdge2,
      ],
    });
  },
  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
