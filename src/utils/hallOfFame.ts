// src/utils/hallOfFame.ts

export interface ScoreEntry {
  playerName: string;
  score: number;
}

const HALL_OF_FAME_KEY = 'hallOfFame';

export const getHallOfFame = (): ScoreEntry[] => {
  try {
    const data = localStorage.getItem(HALL_OF_FAME_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading hall of fame from localStorage', error);
    return [];
  }
};

export const saveScore = (playerName: string, score: number) => {
  try {
    const hallOfFame = getHallOfFame();
    hallOfFame.push({ playerName, score });
    hallOfFame.sort((a, b) => b.score - a.score);
    const topScores = hallOfFame.slice(0, 10);
    localStorage.setItem(HALL_OF_FAME_KEY, JSON.stringify(topScores));
  } catch (error) {
    console.error('Error saving score to localStorage', error);
  }
};
