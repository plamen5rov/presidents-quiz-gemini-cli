// src/components/HallOfFame.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreEntry {
  name: string;
  score: number;
  time: number;
}

const HallOfFame = () => {
  const [highScores, setHighScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  }, []);

  const listVariants = {
