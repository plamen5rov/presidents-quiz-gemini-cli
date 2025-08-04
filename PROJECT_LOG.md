# Project Log & Summary

This document summarizes the development process and current state of the "U.S. Presidents Quiz" application. It serves as a context file for future development sessions.

## 1. Project Overview

The goal was to build a web-based quiz game where players identify U.S. presidents. The project was built using Next.js, TypeScript, and Tailwind CSS.

## 2. Key Technologies & Libraries

- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:**
  - `Lora`: Main application font.
  - `Pirata One`: Thematic font for the Hall of Fame.
  - `Orbitron`: Bold, modern font for the main title.
- **Libraries:**
  - `canvas-confetti`: For the celebration effect on correct answers.

## 3. Core Features Implemented

- **Game Flow:**
  - **Start Screen:** Player enters their name.
  - **Instructions Screen:** Displays game rules before starting.
  - **Game Board:** 10 timed levels where the player guesses the correct president.
  - **Results Screen:** Shows the final score, total time, and a detailed answer review.
- **Scoring System:**
  - +10 points for a correct answer.
  - A 10-second timer for each level.
  - Cumulative time is tracked.
- **Hall of Fame:**
  - Persists in `localStorage`.
  - Ranks the top 10 players.
  - Scoring is based first on points, then on the lowest time as a tie-breaker.
- **Custom Favicon:** A US map icon is used for the browser tab.

## 4. Component Breakdown

- `src/components/PlayerNameInput.tsx`: The initial screen for player name entry.
- `src/components/Instructions.tsx`: The screen displaying game rules.
- `src/components/GameBoard.tsx`: The main game interface.
- `src/components/PresidentCard.tsx`: The individual card for each president's portrait.
- `src/components/GameResults.tsx`: The end-of-game screen.
- `src/components/HallOfFame.tsx`: Displays the high scores.
- `src/components/ConfettiEffect.tsx`: Renders the confetti animation.
- `src/components/SkeletonCard.tsx`: A loading placeholder for the president portraits.
- `src/hooks/useGame.ts`: A custom hook that encapsulates all game logic.

## 5. Key Styling Decisions

- **Start Screen:** Features a background of the Oval Office. The main title uses the "Orbitron" font and is displayed over a full-width, semi-transparent dark blue strip. The Hall of Fame is displayed below the main form.
- **Instructions Screen:** Dark gradient background with custom SVG icons for bullet points.
- **Game Screen:** Dark blue-to-dark-red vertical gradient background. The timer is large and prominent.
- **Results Screen:** Black-to-dark-gray vertical gradient background. Correct/incorrect answers in the review have custom green (`#4A9782`) and red (`#B12C00`) backgrounds.
- **Hall of Fame:** Themed with a `paper.jpg` background and the "Pirata One" font for a classic look.

## 6. Major Bugs & Issues Resolved

- **Infinite Loop:** Resolved a `useEffect` dependency loop in the `useGame` hook.
- **Duplicate Hall of Fame Entries:** Fixed an issue where scores were saved twice due to React's Strict Mode.
- **Layout & Responsiveness:** Fixed multiple issues with overlapping elements and adjusted font/element sizes for better mobile and desktop views.
- **Persistent Vercel/Next.js Logo:** After multiple failed attempts to remove the injected logo, a CSS override (`body > svg { display: none !important; }`) was added to `globals.css` to hide it.

---
*This summary was last updated on Aug 3, 2025, to reflect the final state of the application.*

---
## Log - 2025-08-04

### Styling
- Changed the "Hall of Fame" background to 80% opacity.
- Added a red footer to the starting screen.
- Adjusted the footer size.
- Added text to the footer.
- Updated the footer text.
- Added copyright and mailto link to the footer.
- Added Facebook and GitHub icons to the footer.
- Added a White House image to the header and adjusted its size.

### Optimization
- Removed the unused `tsx` dependency.
- Created a new git branch `feature/remove-tsx-dependency` before removing the dependency.
- Refactored the `GameBoard` and `PresidentCard` components to simplify the `onClick` handler.
- Refactored the `useGame` hook to simplify the game logic.
- Refactored the `GameResults` component to improve readability and separation of concerns.

### Testing
- Installed and configured Jest and React Testing Library.
- Wrote unit tests for the `useGame` hook, covering initialization, correct/incorrect answers, and game over conditions.
- Resolved several configuration issues to get the test suite running successfully.