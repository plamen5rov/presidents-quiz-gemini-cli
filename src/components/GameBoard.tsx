// src/components/GameBoard.tsx
'use client';
import React from 'react';
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
    totalLevels,
    answerStatus,
    selectedPresidentId,
    timeLeft,
  } = useGame();

  React.useEffect(() => {
    if (isGameOver) {
      router.push(`/results?score=${score}&time=${totalTime}`);
    }
  }, [isGameOver, score, totalTime, router]);

  // Fixed preloading logic
  React.useEffect(() => {
    // Preload current level images first (most important)
    currentPresidents.forEach(president => {
      const img = new window.Image();
      img.src = president.portrait;
    });

    // Preload a broader set of images for better coverage
    // This ensures all presidential portraits are cached
    const preloadImages = async () => {
      const imagesToPreload = presidents.slice(0, Math.min(presidents.length, 50)); // Preload first 50
      
      imagesToPreload.forEach((president, index) => {
        // Stagger the preloading to avoid overwhelming the browser
        setTimeout(() => {
          const img = new window.Image();
          img.src = president.portrait;
          img.onerror = () => {
            console.warn(`Failed to preload image: ${president.portrait}`);
          };
        }, index * 50); // 50ms delay between each preload
      });
    };

    preloadImages();
  }, [currentPresidents]);

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
          <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">Score: {score}</div>
        </div>
        
        <div className="text-center my-1 sm:my-2 text-white">
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">Time: </span>
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg animate-pulse">{timeLeft}</span>
        </div>
        
        <div className="mb-1 sm:mb-2 text-center text-white">
          <p className="text-xs sm:text-base md:text-lg lg:text-xl">
            Find: <span className="font-bold">{targetPresident.name}</span> ({targetPresident.years})
          </p>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-1 sm:gap-2">
          {currentPresidents.map((president) => (
            <PresidentCard
              key={`${level}-${president.id}`} // Add level to key for forced re-render
              president={president}
              isSelected={president.id === selectedPresidentId}
              isCorrect={president.id === targetPresident.id}
              isTarget={president.id === targetPresident.id}
              answerStatus={answerStatus}
              onClick={() => handleAnswer(president.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;