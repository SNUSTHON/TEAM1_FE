import React, { useState } from 'react';
import { useExpandCard, useCreateCardMemo } from "@/app/hooks/useCard";

const MindMapBlock = ({ card, depth = 0, onUpdate }) => {
  const [expanded, setExpanded] = useState({});
  const [showMemoInput, setShowMemoInput] = useState(false);
  const [memoInput, setMemoInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: expandCard } = useExpandCard();
  const { mutate: createCardMemo } = useCreateCardMemo();

  const handleClick = (cardId) => {
    if (!expanded[cardId]) {
      setIsLoading(true);
      expandCard({ 
        cardId, 
        callback: (newExpandedCards) => {
          setExpanded(prev => ({ ...prev, [cardId]: true }));
          // 새로 확장된 카드들을 기존 카드 데이터에 추가
          const updatedCard = {
            ...card,
            expandedCards: [...(card.expandedCards || []), ...newExpandedCards]
          };
          onUpdate(updatedCard);
          setIsLoading(false);
        }
      });
    } else {
      setExpanded(prev => ({ ...prev, [cardId]: false }));
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowMemoInput(!showMemoInput);
  };

  const handleMemoSubmit = (e) => {
    e.preventDefault();
    if (memoInput.trim()) {
      setIsLoading(true);
      createCardMemo({ 
        cardId: card.id, 
        content: memoInput 
      }, {
        onSuccess: (newMemo) => {
          const updatedCard = {
            ...card,
            memos: [...(card.memos || []), newMemo]
          };
          onUpdate(updatedCard);
          setMemoInput('');
          setShowMemoInput(false);
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <div 
      style={{ 
        marginLeft: `${depth * 20}px`, 
        marginBottom: '10px', 
        border: '1px solid #ccc', 
        padding: '10px',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => handleClick(card.id)}
      onContextMenu={handleRightClick}
    >
      {isLoading && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#ffd700', textAlign: 'center', padding: '2px', fontSize: '0.8em' }}>Loading...</div>}
      <h3>{card.content}</h3>
      {card.memos && card.memos.map((memo, index) => (
        <p key={index} style={{ fontSize: '0.9em', color: '#666' }}>{memo.content}</p>
      ))}
      {showMemoInput && (
        <form onSubmit={handleMemoSubmit}>
          <input 
            type="text" 
            value={memoInput}
            onChange={(e) => setMemoInput(e.target.value)}
            placeholder="Add a memo"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="submit" onClick={(e) => e.stopPropagation()}>Add</button>
        </form>
      )}
      {card.childCards && card.childCards.map((childCard, index) => (
        <MindMapBlock 
          key={index} 
          card={childCard} 
          depth={depth + 1} 
          onUpdate={(updatedChildCard) => {
            const updatedChildCards = card.childCards.map(c => 
              c.id === updatedChildCard.id ? updatedChildCard : c
            );
            onUpdate({...card, childCards: updatedChildCards});
          }} 
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
      {expanded[card.id] && card.expandedCards && card.expandedCards.map((expandedCard, index) => (
        <MindMapBlock 
          key={`expanded-${index}`} 
          card={expandedCard} 
          depth={depth + 1} 
          onUpdate={(updatedExpandedCard) => {
            const updatedExpandedCards = card.expandedCards.map(c => 
              c.id === updatedExpandedCard.id ? updatedExpandedCard : c
            );
            onUpdate({...card, expandedCards: updatedExpandedCards});
          }}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </div>
  );
};

export default MindMapBlock;