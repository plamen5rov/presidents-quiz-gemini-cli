// src/hooks/useGame.test.ts
import { renderHook, act } from '@testing-library/react';
import { useGame } from './useGame';
import { presidents } from '@/data/presidents';

// Mock the shuffleArray function to control the order of presidents
jest.mock('@/data/presidents', () => ({
  ...jest.requireActual('@/data/presidents'),
  shuffleArray: (array: any[]) => array,
}));

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
  });

  it('should handle a correct answer', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleAnswer(result.current.targetPresident!.id);
    });

    expect(result.current.score).toBe(10);
    expect(result.current.answerStatus).toBe('correct');

    act(() => {
      jest.advanceTimersByTime(3500);
    });

    expect(result.current.level).toBe(2);
  });

  it('should handle an incorrect answer', () => {
    const { result } = renderHook(() => useGame());

    act(() => {
      result.current.handleAnswer(result.current.targetPresident!.id + 1);
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
  });
});
