import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { Handle, Position, useStoreApi } from "@xyflow/react";
import useStore from "@/app/store";
import { useExpandCard } from "@/app/hooks/useCard";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  addChildNode: state.addChildNode,
});
function MindMapNode({ id, data }) {
  const inputRef = useRef();
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);
  const [input, setInput] = useState(data.label);
  const [childDivs, setChildDivs] = useState([]);
  const { mutate: expandCard, data: cardData } = useExpandCard();
  const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
    selector,
    shallow
  );
  // Canvas API를 사용하여 문자열의 실제 너비 계산
  const calculateTextWidth = (text) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "16px Arial"; // 사용 중인 폰트와 크기를 맞춤
    return context.measureText(text).width;
  };

  // input 필드의 너비를 동적으로 설정
  useLayoutEffect(() => {
    if (inputRef.current) {
      const textWidth = calculateTextWidth(data.label);
      inputRef.current.style.width = `${textWidth + 10}px`; // 여백을 위해 10px 추가
    }
  }, [data.label]);

  // 컴포넌트가 렌더링된 후 input 필드에 포커스 설정
  useEffect(() => {
    setTimeout(() => {
      // data.onInitial();
      if (inputRef.current) {
        // inputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);

  const connectingNodeId = useRef(null);
  const store = useStoreApi();
  const getChildNodePosition = (parentNode) => {
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

    // const isTouchEvent = "touches" in event;
    // const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
    // const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
    // we need to remove the wrapper bounds, in order to get the correct mouse position
    // const panePosition = screenToFlowPosition({
    //   x,
    //   y,
    // });

    // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
    return {
      x:
        parentNode.internals.positionAbsolute.x + parentNode.measured.width / 2,
      y:
        parentNode.internals.positionAbsolute.y +
        parentNode.measured.height / 2,
    };
  };
  const handleDoubleClick = useCallback(async () => {
    connectingNodeId.current = id;
    const { nodeLookup } = store.getState();

    if (connectingNodeId.current) {
      const parentNode = nodeLookup.get(connectingNodeId.current);
      const childNodePosition = getChildNodePosition(parentNode);

      if (parentNode && childNodePosition) {
        await expandCard({
          cardId: 214,
          callback: (data) => {
            addChildNode(parentNode, data, childNodePosition);
          },
        });
      }
    }
  }, [getChildNodePosition]);


function MindMapNode({ data }) {
  return (
  );
}

export default MindMapNode;