// src/components/PlayerNameInput.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HallOfFame from './HallOfFame';
import { useRouter } from 'next/navigation';

const PlayerNameInput = () => {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      // Save player name for the game session
      sessionStorage.setItem('playerName', playerName);
      router.push('/game');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          U.S. Presidents Quiz
        </h2>
        <form onSubmit={handleStartGame} className="space-y-6">
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600"
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
  );
};

export default PlayerNameInput;

