import React from "react";
import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
  Position,
} from "@xyflow/react";

function MindMapEdge(props) {
  const { sourceX, sourceY, targetX, targetY } = props;
  console.log(props);

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Right,
    targetX: targetX + 5,
    targetY,
    targetPosition: Position.Left,
  });

  return <BaseEdge path={edgePath} {...props} />;
}

export default MindMapEdge;
