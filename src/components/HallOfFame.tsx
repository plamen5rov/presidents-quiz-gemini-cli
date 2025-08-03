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
    <div 
      className="w-full p-6 mt-8 rounded-lg shadow-inner border-4 border-amber-900/50"
      style={{ 
        backgroundImage: "url('/images/paper.jpg')",
        backgroundSize: 'cover' 
      }}
    >
      <h3 className="text-4xl font-bold text-center text-stone-800 mb-4 font-pirata">
        Hall of Fame
      </h3>
      {highScores.length > 0 ? (
        <ol className="space-y-3 font-pirata">
          {highScores.map((entry, index) => (
            <li key={index} className="flex justify-between text-2xl text-stone-800 font-bold">
              <span>{index + 1}. {entry.name}</span>
              <span>{entry.score}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-center text-xl text-stone-800 font-pirata">No high scores yet. Be the first!</p>
      )}
    </div>
  );
};

export default HallOfFame;
