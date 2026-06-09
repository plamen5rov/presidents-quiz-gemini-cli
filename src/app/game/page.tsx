// src/app/game/page.tsx
import GameBoard from '@/components/GameBoard';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function GamePage() {
  return (
    <main>
      <ErrorBoundary>
        <GameBoard />
      </ErrorBoundary>
    </main>
  );
}
