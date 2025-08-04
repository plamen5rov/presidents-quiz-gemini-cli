// src/components/GameResults.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HallOfFame from './HallOfFame';
import { LevelResult } from '@/hooks/useGame';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MAX_HIGH_SCORES = 10;

interface ScoreEntry {
  name: string;
  score: number;
  time: number;
}

const saveHighScore = (name: string, score: number, time: number) => {
  try {
    const storedScores = localStorage.getItem('highScores');
    const highScores: ScoreEntry[] = storedScores ? JSON.parse(storedScores) : [];

    const newHighScores = [...highScores, { name, score, time }]
      .sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score;
        }
        return a.time - b.time;
      })
      .slice(0, MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(newHighScores));
  } catch (error) {
    console.error('Failed to save high score:', error);
  }
};

const GameResults = () => {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0', 10);
  const time = parseInt(searchParams.get('time') || '0', 10);
  const [history, setHistory] = useState<LevelResult[]>([]);
  const scoreSaved = useRef(false);

  useEffect(() => {
    if (!scoreSaved.current) {
      const playerName = sessionStorage.getItem('playerName') || 'Anonymous';
      saveHighScore(playerName, score, time);
      scoreSaved.current = true;
    }
  }, [score, time]);

  useEffect(() => {
    const gameHistory = sessionStorage.getItem('gameHistory');
    if (gameHistory) {
      setHistory(JSON.parse(gameHistory));
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-800 py-8">
      <motion.div 
        className="w-full max-w-2xl p-8 space-y-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white">Game Over!</motion.h2>
        <motion.p variants={itemVariants} className="text-2xl text-gray-300">Your Final Score:</motion.p>
        <motion.p variants={itemVariants} className="text-6xl font-bold text-blue-400">{score}</motion.p>
        <motion.p variants={itemVariants} className="text-2xl text-gray-300 mt-2">Total Time: {time} seconds</motion.p>
        <motion.div variants={itemVariants}>
          <Link href="/" passHref>
            <button className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Play Again
            </button>
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants} className="pt-6">
          <h3 className="text-2xl font-bold text-white mb-4">Answer Review</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto text-white">
            {history.map((item, index) => (
              <motion.div
                key={item.level}
                className="p-4 rounded-lg"
                style={{ backgroundColor: item.isCorrect ? '#4A9782' : '#B12C00' }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="font-bold text-lg">Level {item.level} ({item.timeTaken}s)</p>
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <HallOfFame />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameResults;
