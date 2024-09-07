"use client";
import React, { useEffect, useState } from 'react';
import { useReadCanvas } from "@/app/hooks/useCanvas";
import MindMapBlock from '@/components/MindMapBlock';

export default function MindMapPage({ params }) {
  const [canvasData, setCanvasData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: readCanvas } = useReadCanvas();

  useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      readCanvas(params.id, {
        onSuccess: (data) => {
          setCanvasData(data);
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        }
      });
    }
  }, [params.id, readCanvas]);

  const handleUpdate = (updatedData) => {
    setCanvasData(prevData => ({
      ...prevData,
      rootCard: updatedData
    }));
  };

  if (!canvasData) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {isLoading && <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#ffd700', textAlign: 'center', padding: '5px' }}>Loading...</div>}
      <h1>{canvasData.subject}</h1>
      {canvasData.rootCard && (
        <MindMapBlock card={canvasData.rootCard} onUpdate={handleUpdate} />
      )}
    </div>
  );
}