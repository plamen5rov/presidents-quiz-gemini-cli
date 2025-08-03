// src/components/GameBoard.tsx
import React from 'react';
import { presidents } from '@/data/presidents';
import PresidentCard from './PresidentCard';

const GameBoard = () => {
  // Temporary: Select first 12 presidents for display
  const currentPresidents = presidents.slice(0, 12);
  const targetPresident = currentPresidents[Math.floor(Math.random() * currentPresidents.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Level 1 of 10</h2>
          <div className="text-2xl font-bold text-blue-500">Score: 0</div>
        </div>
        <div className="mb-4 text-center">
          <p className="text-xl text-gray-700">
            Find: <span className="font-bold">{targetPresident.name}</span> ({targetPresident.years})
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {currentPresidents.map((president) => (
            <PresidentCard key={president.id} president={president} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
