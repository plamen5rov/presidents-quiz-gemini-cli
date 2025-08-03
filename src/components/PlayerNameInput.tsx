// src/components/PlayerNameInput.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HallOfFame from './HallOfFame';

const PlayerNameInput = () => {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      sessionStorage.setItem('playerName', playerName);
      router.push('/instructions');
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/oval-office.jpg')" }}
    >
      <div className="w-full bg-blue-900/90 py-4 mb-8">
        <h1 className="text-5xl md:text-9xl font-orbitron font-bold text-white text-center uppercase" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          U.S. Presidents Quiz
        </h1>
      </div>
      
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
        <form onSubmit={handleStartGame} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="text-xl font-medium text-black">
              Enter Your Name:
            </label>
            <input
              id="playerName"
              name="playerName"
              type="text"
              required
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 text-gray-900 text-xl"
              placeholder="e.g., Jane Doe"
            />
          </div>
          <button
            type="submit"
            disabled={!playerName.trim()}
            className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            ENTER
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-8">
        <HallOfFame />
      </div>
    </div>
  );
};

export default PlayerNameInput;
