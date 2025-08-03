// src/hooks/useGame.ts
import { useState, useEffect, useCallback } from 'react';
import { presidents, President } from '@/data/presidents';

const TOTAL_LEVELS = 10;
const OPTIONS_PER_LEVEL = 12;

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: President[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

type AnswerStatus = 'correct' | 'incorrect' | 'idle';

export interface LevelResult {
  level: number;
  targetPresident: President;
  selectedPresident: President | null;
  isCorrect: boolean;
}

export const useGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameHistory, setGameHistory] = useState<LevelResult[]>([]);
  const [currentPresidents, setCurrentPresidents] = useState<President[]>([]);
  const [targetPresident, setTargetPresident] = useState<President | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
  const [selectedPresidentId, setSelectedPresidentId] = useState<number | null>(null);

  const generateLevel = useCallback(() => {
    if (level > TOTAL_LEVELS) {
      setIsGameOver(true);
      return;
    }

    const shuffledPresidents = shuffleArray(presidents);
    
    // Use functional update to get previous target and avoid dependency loop
    setTargetPresident(prevTarget => {
      const newTarget = shuffledPresidents.find(p => p.id !== prevTarget?.id) || shuffledPresidents[0];
      
      const otherPresidents = presidents.filter(p => p.id !== newTarget.id);
      const shuffledOthers = shuffleArray(otherPresidents);
      const levelPresidents = [newTarget, ...shuffledOthers.slice(0, OPTIONS_PER_LEVEL - 1)];
      
      setCurrentPresidents(shuffleArray(levelPresidents));
      
      return newTarget;
    });

    setAnswerStatus('idle');
    setSelectedPresidentId(null);
  }, [level]);

  useEffect(() => {
    generateLevel();
  }, [level, generateLevel]);

  const handleAnswer = (presidentId: number) => {
    if (answerStatus !== 'idle' || !targetPresident) return;

    const selected = presidents.find(p => p.id === presidentId) || null;
    const isCorrect = presidentId === targetPresident.id;

    setSelectedPresidentId(presidentId);
    setGameHistory(prev => [...prev, { level, targetPresident, selectedPresident: selected, isCorrect }]);

    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    setTimeout(() => {
      setLevel(prevLevel => prevLevel + 1);
    }, 1500);
  };

  useEffect(() => {
    if (isGameOver) {
      sessionStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    }
  }, [isGameOver, gameHistory]);

  return {
    level,
    score,
    currentPresidents,
    targetPresident,
    isGameOver,
    handleAnswer,
    totalLevels: TOTAL_LEVELS,
    answerStatus,
    selectedPresidentId,
  };
};