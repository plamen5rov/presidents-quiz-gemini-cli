// src/utils/hallOfFame.ts

export interface ScoreEntry {
  playerName: string;
  score: number;
}

const HALL_OF_FAME_KEY = 'hallOfFame';
const MAX_ENTRIES = 10;

const isValidEntry = (entry: unknown): entry is ScoreEntry => {
  return (
    typeof entry === 'object' &&
    entry !== null &&
    'playerName' in entry &&
    'score' in entry &&
    typeof (entry as ScoreEntry).playerName === 'string' &&
    typeof (entry as ScoreEntry).score === 'number'
  );
};

export const getHallOfFame = (): ScoreEntry[] => {
  try {
    const data = localStorage.getItem(HALL_OF_FAME_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidEntry);
  } catch {
    return [];
  }
};

export const saveScore = (playerName: string, score: number) => {
  try {
    const hallOfFame = getHallOfFame();

    // Keep only the best score per player
    const existingIndex = hallOfFame.findIndex(
      e => e.playerName.toLowerCase() === playerName.toLowerCase()
    );
    if (existingIndex >= 0 && hallOfFame[existingIndex].score >= score) {
      return; // Player already has a better or equal score
    }
    if (existingIndex >= 0) {
      hallOfFame.splice(existingIndex, 1);
    }

    hallOfFame.push({ playerName, score });
    hallOfFame.sort((a, b) => b.score - a.score);
    localStorage.setItem(HALL_OF_FAME_KEY, JSON.stringify(hallOfFame.slice(0, MAX_ENTRIES)));
  } catch {
    // Silently fail — localStorage may be unavailable
  }
};
