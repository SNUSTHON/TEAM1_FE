import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import useStore from "@/app/store";

function MindMapNode({ id, data }) {
  const inputRef = useRef();
  const updateNodeLabel = useStore((state) => state.updateNodeLabel);
  const [input, setInput] = useState(data.label);
  const [childDivs, setChildDivs] = useState([]);

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
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);

  // 더블 클릭 시 childDiv 생성
  const handleDoubleClick = () => {
    setChildDivs((prevDivs) => [
      ...prevDivs,
      <div key={prevDivs.length} className="childDiv">
        Child Div {prevDivs.length + 1}
      </div>,
    ]);
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
    console.log(childDivs);
  };

  return (
    <>
      <div className="inputWrapper" onDoubleClick={handleDoubleClick}>
        <div className="dragHandle">
          {/* icon taken from grommet https://icons.grommet.io */}
          <svg viewBox="0 0 24 24">
            <path
              fill="#333"
              stroke="#333"
              strokeWidth="1"
              d="M15 5h2V3h-2v2zM7 5h2V3H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2zm8 8h2v-2h-2v2zm-8 0h2v-2H7v2z"
            />
          </svg>
        </div>
        <input
          value={input}
          onChange={(evt) => {
            updateNodeLabel(id, evt.target.value);
            setInput(evt.target.value);
          }}
          className="input"
          ref={inputRef}
        />
      </div>

      {/* 더블 클릭으로 생성된 childDivs 출력 */}
      {childDivs.map((div) => div)}

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default MindMapNode;
