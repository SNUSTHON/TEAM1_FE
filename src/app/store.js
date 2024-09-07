import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { nanoid } from "nanoid/non-secure";

const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
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
  addChildNode: (parentNode, position) => {
    const newNode = {
      id: nanoid(),
      type: "mindmap",
      data: { label: "New Node" },
      position,
      parentId: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
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
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}));

export default useStore;