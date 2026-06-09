// src/components/GameResults.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import HallOfFame from './HallOfFame';
import type { LevelResult } from '@/hooks/useGame';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { saveScore, getHallOfFame, type ScoreEntry } from '@/utils/hallOfFame';

const MAX_SCORE = 100;

const GameResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const score = parseInt(searchParams.get('score') || '0', 10);
  const time = parseInt(searchParams.get('time') || '0', 10);
  const percentage = MAX_SCORE > 0 ? Math.round((score / MAX_SCORE) * 100) : 0;
  const [history, setHistory] = useState<LevelResult[]>([]);
  const [hallOfFame, setHallOfFame] = useState<ScoreEntry[]>([]);
  const [shareText, setShareText] = useState('');
  const scoreSaved = useRef(false);

  const handleShare = () => {
    const text = `🇺🇸 U.S. Presidents Quiz\nScore: ${score}/${MAX_SCORE} (${percentage}%) in ${time}s\nCan you beat me?\nhttps://presidents-quiz-one.vercel.app`;
    navigator.clipboard.writeText(text).then(() => {
      setShareText('Copied!');
      setTimeout(() => setShareText(''), 2000);
    }).catch(() => {
      setShareText('Copy failed');
    });
  };

  const getPlayerName = (): string => {
    const match = document.cookie.match(/(?:^|;\s*)playerName=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : 'Anonymous';
  };

  useEffect(() => {
    if (!scoreSaved.current) {
      const playerName = getPlayerName();
      saveScore(playerName, score);
      setHallOfFame(getHallOfFame());
      scoreSaved.current = true;
    }
  }, [score]);

  useEffect(() => {
    const gameHistory = sessionStorage.getItem('gameHistory');
    if (gameHistory) {
      try {
        setHistory(JSON.parse(gameHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const correctCount = history.filter(h => h.isCorrect).length;
  const wrongCount = history.length - correctCount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-red-900 py-8 px-4">
      <motion.div
        className="w-full max-w-3xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Score Card */}
        <motion.div
          variants={itemVariants}
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Game Over!</h2>

          <div className="mb-6">
            <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white">
              {score}<span className="text-xl lg:text-2xl text-gray-500 ml-1">/ {MAX_SCORE}</span>
            </p>
            <p className="text-sm md:text-base lg:text-lg text-gray-400 mt-1">{percentage}% correct</p>
          </div>

          <div className="flex justify-center gap-6 md:gap-8 text-sm md:text-base lg:text-lg text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500" />
              <span>{correctCount} correct</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-500" />
              <span>{wrongCount} missed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-blue-400" />
              <span>{time}s total</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex-1 px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Play Again
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 px-4 py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {shareText || 'Share Results'}
            </button>
          </div>
        </motion.div>

        {/* Answer Review */}
        {history.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4">Answer Review</h3>
            <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2">
              {history.map((item, index) => (
                <motion.div
                  key={item.level}
                  className={`flex items-center gap-4 p-3 rounded-xl ${
                    item.isCorrect ? 'bg-green-900/30 border border-green-500/20' : 'bg-red-900/30 border border-red-500/20'
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                    item.isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {item.isCorrect ? '✓' : '✗'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400">Lv.{item.level}</span>
                      <span className="text-white font-medium truncate">{item.targetPresident.name}</span>
                      <span className="text-gray-500 text-xs">({item.timeTaken}s)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    {item.selectedPresident && (
                      <div className="flex flex-col items-center gap-1">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden shadow-md">
                          <Image src={item.selectedPresident.portrait} alt={item.selectedPresident.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <span className="text-xs text-gray-400">
                          {item.isCorrect ? '✓ correct' : 'your pick'}
                        </span>
                      </div>
                    )}
                    {!item.isCorrect && (
                      <div className="flex flex-col items-center gap-1">
                        <div className="relative w-16 h-20 rounded-lg overflow-hidden shadow-md">
                          <Image src={item.targetPresident.portrait} alt={item.targetPresident.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <span className="text-xs text-gray-400">correct</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Hall of Fame */}
        <motion.div variants={itemVariants}>
          <HallOfFame scores={hallOfFame} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameResults;