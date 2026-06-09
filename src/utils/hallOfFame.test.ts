import { getHallOfFame, saveScore, type ScoreEntry } from './hallOfFame';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
});

describe('hallOfFame', () => {
  describe('getHallOfFame', () => {
    it('returns empty array when no data exists', () => {
      expect(getHallOfFame()).toEqual([]);
    });

    it('returns valid entries from localStorage', () => {
      const entries: ScoreEntry[] = [
        { playerName: 'Alice', score: 90 },
        { playerName: 'Bob', score: 80 },
      ];
      localStorage.setItem('hallOfFame', JSON.stringify(entries));
      expect(getHallOfFame()).toEqual(entries);
    });

    it('filters out invalid entries', () => {
      localStorage.setItem('hallOfFame', JSON.stringify([
        { playerName: 'Alice', score: 90 },
        { playerName: 123, score: 'not-a-number' },
        'not-an-object',
        null,
      ]));
      const result = getHallOfFame();
      expect(result).toHaveLength(1);
      expect(result[0].playerName).toBe('Alice');
    });

    it('returns empty array for corrupt JSON', () => {
      localStorage.setItem('hallOfFame', '{broken json');
      expect(getHallOfFame()).toEqual([]);
    });

    it('returns empty array for non-array stored data', () => {
      localStorage.setItem('hallOfFame', JSON.stringify({ foo: 'bar' }));
      expect(getHallOfFame()).toEqual([]);
    });
  });

  describe('saveScore', () => {
    it('saves a new score', () => {
      saveScore('Alice', 70);
      const scores = getHallOfFame();
      expect(scores).toHaveLength(1);
      expect(scores[0]).toEqual({ playerName: 'Alice', score: 70 });
    });

    it('keeps best score per player (case-insensitive)', () => {
      saveScore('Alice', 70);
      saveScore('ALICE', 50); // lower, should not replace
      const scores = getHallOfFame();
      expect(scores).toHaveLength(1);
      expect(scores[0].score).toBe(70);
    });

    it('replaces with higher score for same player', () => {
      saveScore('Alice', 70);
      saveScore('Alice', 90);
      const scores = getHallOfFame();
      expect(scores).toHaveLength(1);
      expect(scores[0].score).toBe(90);
    });

    it('sorts scores descending', () => {
      saveScore('Alice', 50);
      saveScore('Bob', 80);
      saveScore('Carol', 70);
      const scores = getHallOfFame();
      expect(scores[0].score).toBe(80);
      expect(scores[1].score).toBe(70);
      expect(scores[2].score).toBe(50);
    });

    it('caps at 10 entries', () => {
      for (let i = 1; i <= 15; i++) {
        saveScore(`Player${i}`, i * 10);
      }
      const scores = getHallOfFame();
      expect(scores).toHaveLength(10);
      expect(scores[0].score).toBe(150);
    });

    it('survives malformed existing data', () => {
      localStorage.setItem('hallOfFame', 'garbage');
      saveScore('Alice', 70);
      const scores = getHallOfFame();
      expect(scores).toHaveLength(1);
      expect(scores[0].playerName).toBe('Alice');
    });
  });
});
