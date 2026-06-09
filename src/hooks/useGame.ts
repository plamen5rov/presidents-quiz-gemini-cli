// src/hooks/useGame.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { presidents, type President } from '@/data/presidents';

const TOTAL_LEVELS = 10;
const OPTIONS_PER_LEVEL = 12;
const TIME_PER_LEVEL = 10;

export const shuffleArray = (array: President[]): President[] => {
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
  timeTaken: number;
}

export const useGame = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [gameHistory, setGameHistory] = useState<LevelResult[]>([]);
  const [currentPresidents, setCurrentPresidents] = useState<President[]>([]);
  const [targetPresident, setTargetPresident] = useState<President | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('idle');
  const [selectedPresidentId, setSelectedPresidentId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_LEVEL);
  const prevTargetRef = useRef<President | null>(null);
  const usedTargetIds = useRef<Set<number>>(new Set());

  const advanceLevel = useCallback(() => {
    if (level < TOTAL_LEVELS) {
      setLevel(prevLevel => prevLevel + 1);
    } else {
      setIsGameOver(true);
    }
  }, [level]);

  const handleAnswer = useCallback((presidentId: number) => {
    if (answerStatus !== 'idle' || !targetPresident) return;

    const timeTaken = TIME_PER_LEVEL - timeLeft;
    setTotalTime(prev => prev + timeTaken);

    const isCorrect = presidentId === targetPresident.id && presidentId !== 0;
    const selected = presidents.find(p => p.id === presidentId) || null;

    setSelectedPresidentId(presidentId);
    setGameHistory(prev => [...prev, { level, targetPresident, selectedPresident: selected, isCorrect, timeTaken }]);

    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    setTimeout(advanceLevel, 3500);
  }, [answerStatus, level, targetPresident, timeLeft, advanceLevel]);

  const handleSkip = useCallback(() => {
    if (answerStatus !== 'idle' || !targetPresident) return;
    handleAnswer(0);
  }, [answerStatus, targetPresident, handleAnswer]);

  const generateLevel = useCallback(() => {
    const unusedPresidents = presidents.filter(p => !usedTargetIds.current.has(p.id));
    const pool = unusedPresidents.length >= OPTIONS_PER_LEVEL ? unusedPresidents : presidents;

    const shuffledPool = shuffleArray(pool);
    const newTarget = shuffledPool.find(p => p.id !== prevTargetRef.current?.id) || shuffledPool[0];
    prevTargetRef.current = newTarget;
    usedTargetIds.current.add(newTarget.id);

    const otherPresidents = pool.filter(p => p.id !== newTarget.id);
    const shuffledOthers = shuffleArray(otherPresidents);
    const levelPresidents = [newTarget, ...shuffledOthers.slice(0, OPTIONS_PER_LEVEL - 1)];

    // Deduplicate by portrait — prevents Grover Cleveland's two entries from showing identical image
    const seenPortraits = new Set<string>();
    const deduped: President[] = [];
    const remaining = [...shuffledOthers.slice(OPTIONS_PER_LEVEL - 1)];
    for (const p of levelPresidents) {
      if (!seenPortraits.has(p.portrait)) {
        seenPortraits.add(p.portrait);
        deduped.push(p);
      } else {
        // Find a replacement with a unique portrait
        const replacement = remaining.find(r => !seenPortraits.has(r.portrait));
        if (replacement) {
          seenPortraits.add(replacement.portrait);
          deduped.push(replacement);
        }
      }
    }

    setTargetPresident(newTarget);
    setCurrentPresidents(shuffleArray(deduped));
    setAnswerStatus('idle');
    setSelectedPresidentId(null);
    setTimeLeft(TIME_PER_LEVEL);
  }, []);

  useEffect(() => {
    if (!isGameOver) {
      generateLevel();
    }
  }, [level, isGameOver, generateLevel]);

  useEffect(() => {
    if (answerStatus !== 'idle' || isGameOver) return;
    if (timeLeft <= 0) {
      handleAnswer(0);
      return;
    }
    const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, answerStatus, isGameOver, handleAnswer]);

  useEffect(() => {
    if (isGameOver) {
      try {
        sessionStorage.setItem('gameHistory', JSON.stringify(gameHistory));
      } catch {
        // sessionStorage may be unavailable
      }
    }
  }, [isGameOver, gameHistory]);

  return {
    level,
    score,
    totalTime,
    currentPresidents,
    targetPresident,
    isGameOver,
    handleAnswer,
    handleSkip,
    totalLevels: TOTAL_LEVELS,
    answerStatus,
    selectedPresidentId,
    timeLeft,
  };
};
