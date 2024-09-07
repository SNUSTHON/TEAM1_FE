import React from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

function MindMapEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
  );
}

export default MindMapEdge;