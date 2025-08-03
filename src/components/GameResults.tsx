// src/components/GameResults.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HallOfFame from './HallOfFame';
import { LevelResult } from '@/hooks/useGame';
import Image from 'next/image';

const MAX_HIGH_SCORES = 10;

const GameResults = () => {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0', 10);
  const [history, setHistory] = useState<LevelResult[]>([]);
  const scoreSaved = useRef(false);

  useEffect(() => {
    if (!scoreSaved.current) {
      const playerName = sessionStorage.getItem('playerName') || 'Anonymous';
      const storedScores = localStorage.getItem('highScores');
      const highScores = storedScores ? JSON.parse(storedScores) : [];

      const newHighScores = [...highScores, { name: playerName, score }]
        .sort((a, b) => b.score - a.score)
        .slice(0, MAX_HIGH_SCORES);

      localStorage.setItem('highScores', JSON.stringify(newHighScores));
      scoreSaved.current = true;
    }

    const gameHistory = sessionStorage.getItem('gameHistory');
    if (gameHistory) {
      setHistory(JSON.parse(gameHistory));
    }
  }, [score]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-800 py-8">
      <div className="w-full max-w-2xl p-8 space-y-6 text-center">
        <h2 className="text-4xl font-bold text-white">Game Over!</h2>
        <p className="text-2xl text-gray-300">Your Final Score:</p>
        <p className="text-6xl font-bold text-blue-400">{score}</p>
        <Link href="/" passHref>
          <button className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Play Again
          </button>
        </Link>
        
        <div className="pt-6">
          <h3 className="text-2xl font-bold text-white mb-4">Answer Review</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto text-white">
            {history.map(item => (
              <div 
                key={item.level} 
                className="p-4 rounded-lg"
                style={{ backgroundColor: item.isCorrect ? '#4A9782' : '#B12C00' }}
              >
                <p className="font-bold text-lg">Level {item.level}</p>
                <p>Target: {item.targetPresident.name}</p>
                <div className="flex justify-around items-center mt-2">
                  <div>
                    <p>Your Answer:</p>
                    {item.selectedPresident ? (
                      <>
                        <Image src={item.selectedPresident.portrait} alt={item.selectedPresident.name} width={80} height={100} className="rounded-md mx-auto" />
                        <p>{item.selectedPresident.name} {item.isCorrect ? '✓' : '✗'}</p>
                      </>
                    ) : (
                      <p>No answer ✗</p>
                    )}
                  </div>
                  {!item.isCorrect && (
                    <div>
                      <p>Correct Answer:</p>
                      <Image src={item.targetPresident.portrait} alt={item.targetPresident.name} width={80} height={100} className="rounded-md mx-auto" />
                      <p>{item.targetPresident.name}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <HallOfFame />
      </div>
    </div>
  );
};

export default GameResults;