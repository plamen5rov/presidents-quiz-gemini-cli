# DONE.md

## Phase 1: Bug Fixes
- [2026-06-09] Fix president appearing twice in session — replaced `prevTargetRef` with `usedTargetIds` Set to track all used targets across levels (files: src/hooks/useGame.ts)

## Phase 2: UI/UX Polish
- [2026-06-09] Fix SVG icon warnings — removed `className="w-6 h-6"` conflicting with `width={24} height={24}` on facebook/github icons (files: src/components/PlayerNameInput.tsx)
- [2026-06-09] Enlarge "Find...president" text on desktop — changed from `lg:text-xl` to `lg:text-4xl` (files: src/components/GameBoard.tsx)
- [2026-06-09] Move timer into header line alongside Score, reduce size for cleaner layout (files: src/components/PlayerNameInput.tsx)
- [2026-06-09] Redesign Instructions page — removed checkmarks, added card-style rules with numbered gradient circles and hover effects (files: src/components/Instructions.tsx)
- [2026-06-09] Fix footer mobile layout — responsive text, stacked layout on mobile (files: src/components/PlayerNameInput.tsx)
- [2026-06-09] Redesign GameResults — cleaner layout, removed letter grades (US-specific), bigger stats on desktop, compact answer review with small portraits (files: src/components/GameResults.tsx)
- [2026-06-09] Fix Image warnings in GameResults — switched from `width`/`height` to `fill` mode with properly sized containers (files: src/components/GameResults.tsx)
- [2026-06-09] Add `suppressHydrationWarning` to root `<html>` tag for Dark Reader extension compatibility (files: src/app/layout.tsx)

## Phase 3: Testing
- [2026-06-09] Fix test flakiness — made incorrect answer test deterministic using `.find()` instead of index assumption (files: src/hooks/useGame.test.ts)
