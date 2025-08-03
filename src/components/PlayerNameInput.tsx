// src/components/PlayerNameInput.tsx
import React from 'react';
import Link from 'next/link';

const PlayerNameInput = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          U.S. Presidents Quiz
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="playerName" className="text-sm font-medium text-gray-700">
              Enter Your Name
            </label>
            <input
              id="playerName"
              name="playerName"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., John Doe"
            />
          </div>
          <Link href="/game" passHref>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Game
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default PlayerNameInput;
