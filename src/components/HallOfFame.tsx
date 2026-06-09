// src/components/HallOfFame.tsx
'use client';

import { useEffect, useState, type FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getHallOfFame, type ScoreEntry } from '@/utils/hallOfFame';

interface HallOfFameProps {
  scores?: ScoreEntry[];
}

const MEDALS = ['🥇', '🥈', '🥉'];

const HallOfFame: FC<HallOfFameProps> = ({ scores }) => {
  const [highScores, setHighScores] = useState<ScoreEntry[]>(scores || []);

  useEffect(() => {
    const loadScores = () => {
      setHighScores(scores || getHallOfFame());
    };
    loadScores();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'hallOfFame' && !scores) {
        loadScores();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [scores]);

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
    <div className="relative w-full p-6 mt-8 rounded-lg shadow-inner border-4 border-amber-900/50 overflow-hidden">
      <Image
        src="/images/paper.jpg"
        alt=""
        fill
        className="object-cover opacity-80 rounded-lg"
        sizes="(max-width: 640px) 100vw, 448px"
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
                key={`${entry.playerName}-${entry.score}`} 
                className="flex justify-between text-2xl text-stone-800 font-bold"
                variants={itemVariants}
              >
                <span>{index < 3 ? `${MEDALS[index]} ` : `${index + 1}. `}{entry.playerName}</span>
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
