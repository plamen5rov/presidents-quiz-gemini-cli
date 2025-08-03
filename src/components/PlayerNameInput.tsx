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
      router.push('/game');
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/us-flag.jpg')" }}
    >
      <div 
        className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/us-map.png')" }}
      >
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            U.S. Presidents Quiz
          </h2>
          <form onSubmit={handleStartGame} className="space-y-6 mt-4">
            <div>
              <label htmlFor="playerName" className="text-sm font-medium text-black">
                Enter Your Name
              </label>
              <input
                id="playerName"
                name="playerName"
                type="text"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 text-gray-900"
                placeholder="e.g., Jane Doe"
              />
            </div>
            <button
              type="submit"
              disabled={!playerName.trim()}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Game
            </button>
          </form>
          <HallOfFame />
        </div>
      </div>
    </div>
  );
};

export default PlayerNameInput;


