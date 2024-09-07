import React from 'react';
import { Handle, Position } from '@xyflow/react';

function MindMapNode({ data }) {
  return (
    <div style={{ 
      background: '#ffffff', 
      padding: '10px 20px', 
      borderRadius: '5px', 
      border: '1px solid #ddd',
      minWidth: '150px',
      maxWidth: '250px',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      color: '#333',
    }}>
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </div>
  );
}

export default MindMapNode;