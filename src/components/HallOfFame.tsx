// src/components/HallOfFame.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface ScoreEntry {
  name: string;
  score: number;
}

const HallOfFame = () => {
  const [highScores, setHighScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  }, []);

  return (
    <div className="w-full p-4 mt-8 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold text-center text-gray-700 mb-4">Hall of Fame</h3>
      {highScores.length > 0 ? (
        <ol className="space-y-2">
          {highScores.map((entry, index) => (
            <li key={index} className="flex justify-between text-lg">
              <span>{index + 1}. {entry.name}</span>
              <span className="font-bold">{entry.score}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-gray-500">No high scores yet. Be the first!</p>
      )}
    </div>
  );
};

export default HallOfFame;
