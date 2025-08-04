// src/components/HallOfFame.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreEntry {
  playerName: string;
  score: number;
}

const HallOfFame = () => {
  const [highScores, setHighScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      const response = await fetch('/api/hall-of-fame');
      const data = await response.json();
      setHighScores(data);
    };

    fetchHighScores();
  }, []);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="relative w-full p-6 mt-8 rounded-lg shadow-inner border-4 border-amber-900/50">
      <div
        className="absolute inset-0 bg-cover opacity-80 rounded-lg"
        style={{
          backgroundImage: "url('/images/paper.jpg')",
        }}
      />
      <div className="relative z-10">
        <h3 className="text-4xl font-bold text-center text-stone-800 mb-4 font-pirata">
          Hall of Fame
        </h3>
        {highScores.length > 0 ? (
          <motion.ol 
            className="space-y-3 font-pirata"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {highScores.map((entry, index) => (
              <motion.li 
                key={index} 
                className="flex justify-between text-2xl text-stone-800 font-bold"
                variants={itemVariants}
              >
                <span>{index + 1}. {entry.playerName}</span>
                <span>{entry.score} pts</span>
              </motion.li>
            ))}
          </motion.ol>
        ) : (
          <p className="text-center text-xl text-stone-800 font-pirata">No high scores yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default HallOfFame;