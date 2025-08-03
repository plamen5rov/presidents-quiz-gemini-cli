// src/components/GameBoard.tsx
'use client';

import React from 'react';
import { useGame } from '@/hooks/useGame';
import PresidentCard from './PresidentCard';
import ConfettiEffect from './ConfettiEffect';
import { useRouter } from 'next/navigation';

const GameBoard = () => {
  const router = useRouter();
  const {
    level,
    score,
    currentPresidents,
    targetPresident,
    isGameOver,
    handleAnswer,
    totalLevels,
    answerStatus,
    selectedPresidentId,
  } = useGame();

  React.useEffect(() => {
    if (isGameOver) {
      router.push(`/results?score=${score}`);
    }
  }, [isGameOver, score, router]);

  if (!targetPresident) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-red-900 p-4"
    >
      <ConfettiEffect trigger={answerStatus === 'correct'} />
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4 text-white">
          <h2 className="text-2xl font-bold">Level {level} of {totalLevels}</h2>
          <div className="text-2xl font-bold">Score: {score}</div>
        </div>
        <div className="mb-4 text-center text-white">
          <p className="text-xl">
            Find: <span className="font-bold">{targetPresident.name}</span> ({targetPresident.years})
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {currentPresidents.map((president) => (
            <div key={president.id} onClick={() => handleAnswer(president.id)}>
              <PresidentCard
                president={president}
                isSelected={president.id === selectedPresidentId}
                isCorrect={president.id === targetPresident.id}
                isTarget={president.id === targetPresident.id}
                answerStatus={answerStatus}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;