# Project Log & Summary

This document summarizes the development process and current state of the "U.S. Presidents Quiz" application. It serves as a context file for future development sessions.

## 1. Project Overview

The goal was to build a web-based quiz game where players identify U.S. presidents based on their portrait, name, and years of service. The project was built using Next.js, TypeScript, and Tailwind CSS.

## 2. Key Technologies & Libraries

- **Framework:** Next.js with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:**
  - `Lora`: Main application font.
  - `Pirata One`: Thematic font for the Hall of Fame.
- **Libraries:**
  - `canvas-confetti`: For the celebration effect on correct answers.

## 3. Core Features Implemented

- **Game Flow:**
  - **Start Screen:** Player enters their name.
  - **Instructions Screen:** Displays game rules before starting.
  - **Game Board:** 10 timed levels where the player guesses the correct president from a grid of 12 portraits.
  - **Results Screen:** Shows the final score, total time, and a detailed answer review.
- **Scoring System:**
  - +10 points for a correct answer.
  - A 10-second timer for each level.
  - Cumulative time is tracked.
- **Hall of Fame:**
  - Persists in `localStorage`.
  - Ranks the top 10 players.
  - Scoring is based first on points, then on the lowest time as a tie-breaker.
- **Visual Feedback:**
  - Correct/incorrect answers are indicated with colored borders on the cards.
  - A confetti effect triggers on correct answers.

## 4. Component Breakdown

- `src/components/PlayerNameInput.tsx`: The initial screen for player name entry.
- `src/components/Instructions.tsx`: The screen displaying game rules.
- `src/components/GameBoard.tsx`: The main game interface, including the timer and grid of cards.
- `src/components/PresidentCard.tsx`: The individual card for each president's portrait.
- `src/components/GameResults.tsx`: The end-of-game screen with score, time, and answer review.
- `src/components/HallOfFame.tsx`: Displays the high scores.
- `src/components/ConfettiEffect.tsx`: Renders the confetti animation.
- `src/components/SkeletonCard.tsx`: A loading placeholder for the president portraits.
- `src/hooks/useGame.ts`: A custom hook that encapsulates all game logic (state management, level generation, scoring, timing, history).

## 5. Key Styling Decisions

- **Start Screen:** US flag background with a semi-transparent white overlay for the form. The "ENTER" button has a modern gradient style.
- **Instructions Screen:** Dark blue-to-red gradient background with custom SVG icons for bullet points.
- **Game Screen:** Dark blue-to-dark-red vertical gradient background. The timer is large and prominent.
- **Results Screen:** Black-to-dark-gray vertical gradient background. Correct/incorrect answers in the review have custom green (`#4A9782`) and red (`#B12C00`) backgrounds.
- **Hall of Fame:** Themed with a tiled parchment paper background and the "Pirata One" font for a classic look.

## 6. Major Bugs Fixed

- **Infinite Loop:** Resolved a `useEffect` dependency loop in the `useGame` hook.
- **Duplicate Hall of Fame Entries:** Fixed an issue where scores were saved twice due to React's Strict Mode by using a `useRef` to track if the score was already saved.
- **Font/Image Visibility:** Addressed multiple issues with text colors, placeholder visibility, and incorrect/corrupted background images.

---
*This summary was created to provide context for the next development session.*
