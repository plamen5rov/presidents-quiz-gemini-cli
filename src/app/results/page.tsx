// src/app/results/page.tsx
import GameResults from '@/components/GameResults';
import { Suspense } from 'react';

export default function ResultsPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <GameResults />
      </Suspense>
    </main>
  );
}
