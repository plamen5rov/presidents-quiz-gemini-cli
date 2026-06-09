// src/components/GameBoard.tsx
'use client';
import { useEffect, useCallback } from 'react';
import { useGame } from '@/hooks/useGame';
import { presidents } from '@/data/presidents';
import PresidentCard from './PresidentCard';
import ConfettiEffect from './ConfettiEffect';
import { useRouter } from 'next/navigation';

const GameBoard = () => {
  const router = useRouter();
  const {
    level,
    score,
    totalTime,
    currentPresidents,
    targetPresident,
    isGameOver,
    handleAnswer,
    handleSkip,
    totalLevels,
    answerStatus,
    selectedPresidentId,
    timeLeft,
  } = useGame();

  useEffect(() => {
    if (isGameOver) {
      router.push(`/results?score=${score}&time=${totalTime}`);
    }
  }, [isGameOver, score, totalTime, router]);

  const onCardClick = useCallback((presidentId: number) => {
    handleAnswer(presidentId);
  }, [handleAnswer]);

  const maxScore = totalLevels * 10;

  // Preload all president images once on mount
  useEffect(() => {
    presidents.forEach(president => {
      const img = new window.Image();
      img.src = president.portrait;
    });
  }, []);

  if (!targetPresident) {
    return <div>Loading...</div>;
  }

  return (
    <div 
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-red-900 p-1 sm:p-2 md:p-4"
    >
      <ConfettiEffect trigger={answerStatus === 'correct'} />
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-1 sm:mb-2 text-white">
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">Level {level} of {totalLevels}</h2>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">Score: {score} / {maxScore}</div>
            <div className="text-white flex items-center gap-1" aria-live="polite">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">Time:</span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg animate-pulse">{timeLeft}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-1 sm:mb-2 flex justify-center gap-4 items-center">
          <p className="text-base sm:text-lg md:text-2xl lg:text-4xl text-white">
            Find: <span className="font-bold">{targetPresident.name}</span> ({targetPresident.years})
          </p>
          {answerStatus === 'idle' && (
            <button
              type="button"
              onClick={handleSkip}
              className="px-3 py-1 text-sm font-bold text-white bg-gray-600/70 hover:bg-gray-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              Skip
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2">
          {currentPresidents.map((president, index) => (
            <PresidentCard
              key={president.id}
              president={president}
              isSelected={president.id === selectedPresidentId}
              isCorrect={president.id === targetPresident.id}
              isTarget={president.id === targetPresident.id}
              answerStatus={answerStatus}
              onClick={() => onCardClick(president.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;