import type { President } from '@/data/presidents';
// src/hooks/useGame.test.ts
import { renderHook, act } from '@testing-library/react';
import { useGame } from './useGame';

// Mock shuffleArray to return identity (no shuffle) for deterministic tests
jest.mock('./useGame', () => {
  const actual = jest.requireActual('./useGame');
  return {
    ...actual,
    shuffleArray: (array: President[]) => [...array],
  };
});

describe('useGame hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useGame());

    expect(result.current.level).toBe(1);
    expect(result.current.score).toBe(0);
    expect(result.current.totalTime).toBe(0);
    expect(result.current.isGameOver).toBe(false);
    expect(result.current.answerStatus).toBe('idle');
    expect(result.current.currentPresidents.length).toBe(12);
  });

  it('should handle a correct answer', () => {
    const { result } = renderHook(() => useGame());
    const targetId = result.current.targetPresident!.id;

    act(() => {
      result.current.handleAnswer(targetId);
    });

    expect(result.current.score).toBe(10);
    expect(result.current.answerStatus).toBe('correct');

    act(() => {
      jest.advanceTimersByTime(3500);
    });

    expect(result.current.level).toBe(2);
    expect(result.current.answerStatus).toBe('idle');
  });

  it('should handle an incorrect answer', () => {
    const { result } = renderHook(() => useGame());

    const wrongPresident = result.current.currentPresidents.find(
      p => p.id !== result.current.targetPresident!.id
    )!;

    act(() => {
      result.current.handleAnswer(wrongPresident.id);
    });

    expect(result.current.score).toBe(0);
    expect(result.current.answerStatus).toBe('incorrect');
  });

  it('should end the game after the final level', () => {
    const { result } = renderHook(() => useGame());

    for (let i = 1; i <= 10; i++) {
      act(() => {
        result.current.handleAnswer(result.current.targetPresident!.id);
      });
      act(() => {
        jest.advanceTimersByTime(3500);
      });
    }

    expect(result.current.isGameOver).toBe(true);
    expect(result.current.level).toBe(10);
  });

  it('should handle skip correctly', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleSkip();
    });

    expect(result.current.answerStatus).toBe('incorrect');
    expect(result.current.score).toBe(0);

    act(() => {
      jest.advanceTimersByTime(3500);
    });

    expect(result.current.level).toBe(2);
    expect(result.current.answerStatus).toBe('idle');
  });
});
