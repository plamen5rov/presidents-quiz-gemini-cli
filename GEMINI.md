# GEMINI.md

## Project Overview

This is a web-based "US Presidents Quiz" game built using Next.js with Typescipt and styled with Tailwind CSS.

The game gives the player a random choice of 12 US Presidents portraits (cards) and asks him to guess a given US President - the name and the years of service are given.

The player has 10 seconds to click on the right card and than go to the next level.

## Key Components

- `/src/components/`: Reusable React UI components.
- `/src/hooks/`: Custom React hooks.
- `/src/utils/`: Utility functions used across the app.
- `/public/`: Static assets.

Main entry point: `src/App.js`

### Presidents Data (`src/data/presidents.ts`)
Create comprehensive data for all US Presidents including:
- Full name
- Years in service
- Image URL (from Library of Congress)
- Presidential order number

**Image Source**: Download presidential portraits from Library of Congress Presidential Portraits collection: https://www.loc.gov/free-to-use/presidential-portraits/

### Game Progression
1. **Start Screen**: Player enters name, view Hall of Fame preview
2. **Game Levels**: 10 levels total
   - Each level shows 12 randomly selected president portraits
   - Target president displayed as: "Find: [President Name] ([Years in Service])"
   - Player clicks on correct president portrait
3. **Level Completion**: 
   - Correct answer: 4-second confetti animation, score +10, next level
   - Incorrect answer: show correct answer, score unchanged, next level
4. **End Game**: Final score, complete answer review, Hall of Fame update
 
 ### Scoring System
- +10 points per correct answer
- 0 points for incorrect answers
- Maximum possible score: 100 points

## Component Requirements

### 1. PlayerNameInput Component
- Modern card design with gradient background
- Input validation for player name
- Animated "Start Game" button
- Hall of Fame preview display

### 2. GameBoard Component
- **Mobile Layout**: 3x4 grid of president cards
- **Desktop Layout**: 4x3 grid of president cards
- Prominent level indicator (Level X of 10)
- Score display in top corner
- Target president information clearly displayed
- Progress indicator

### 3. PresidentCard Component
- **Card Design**: Presidential portrait with subtle border
- **Hover Effects**: 
  - Scale transform (scale-105)
  - Enhanced shadow
  - Subtle border glow
- **Click Animation**: Ripple effect
- **Responsive Sizing**: Optimized for mobile touch targets
- **Loading States**: Skeleton loader while images load
- **Error Handling**: Fallback image for broken links

### 4. ConfettiEffect Component
- Use canvas-confetti library
- Trigger on correct answers only
- 4-second duration with multiple bursts
- Custom colors matching app theme
- Performance optimized

### 5. GameResults Component
- **Final Score**: Large, celebratory display
- **Answer Review**: Level-by-level breakdown showing:
  - Target president name and portrait
  - Player's selected answer
  - Visual indicators (✓ for correct, ✗ for incorrect)
  - For wrong answers: display correct president name
- **Layout**: Modern card-based design with smooth animations

### 6. HallOfFame Component
- Display top 10 scores
- Highlight current player's ranking
- Animated entry for new high scores
- Persistent storage using localStorage
- Responsive table design

## Design Requirements

### Mobile-First Responsive Design
- **Breakpoints**: 
  - Mobile: 375px minimum
  - Tablet: 768px
  - Desktop: 1024px+
- **Touch Targets**: Minimum 44px for accessibility
- **Typography**: Responsive font scaling
- **Images**: Optimized for different screen densities

### Modern UI Design
- **Color Palette**:
  - Primary: #3B82F6 (blue)
  - Secondary: #8B5CF6 (purple)
  - Success: #10B981 (green)
  - Error: #EF4444 (red)
  - Background: #F8FAFC (light gray)
  - Cards: #FFFFFF (white)
  - Text: #1F2937 (dark gray)

- **Visual Effects**:
  - Gradient backgrounds with subtle animations
  - Glass morphism effects on cards
  - Smooth transitions (300ms duration)
  - Micro-interactions on hover/click
  - Loading animations

### CSS Animation Requirements
- Card hover: `transform: scale(1.05)` with smooth transition
- Button interactions: ripple effects
- Page transitions: fade in/out
- Score updates: number counting animation
- Confetti: full-screen celebration overlay

## Technical Implementation

### Image Optimization
- Use Next.js Image component for automatic optimization
- Implement lazy loading for president portraits
- Provide loading skeletons
- WebP format preferred, with fallbacks
- Consistent aspect ratios (4:5 recommended)

### Performance Optimization
- Preload next level images in background
- React.memo for PresidentCard components
- Dynamic imports for non-critical components
- Optimize bundle size
- Implement proper error boundaries

### Data Persistence
- localStorage for Hall of Fame scores
- Session storage for game progress
- Error handling for storage limitations
- Data validation and sanitization

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader announcements for game state changes
- High contrast mode compatibility
- Focus management throughout game flow

## Game Logic Implementation

### Level Generation Algorithm
1. Create pool of all presidents
2. Randomly select target president
3. Randomly select 11 additional presidents
4. Shuffle array for random card positioning
5. Ensure no duplicates within single level

### Random Selection Logic
- Use cryptographically secure random number generation
- Implement Fisher-Yates shuffle algorithm
- Ensure fair distribution across multiple games
- Prevent same president appearing multiple times in one level

## Error Handling
- Network failures for image loading
- localStorage quota exceeded
- Invalid game state recovery
- Graceful degradation for older browsers
- User-friendly error messages

## Testing Considerations
- Component unit tests
- Game logic integration tests
- Mobile responsiveness testing
- Accessibility compliance testing
- Performance benchmarking

## Deployment Preparation
- Environment variable configuration
- Build optimization
- Asset optimization
- SEO meta tags
- Progressive Web App features (optional)

## Success Criteria
✅ Mobile-first responsive design works flawlessly  
✅ All 10 game levels function correctly  
✅ President identification accuracy  
✅ Confetti animations trigger appropriately  
✅ Score tracking and Hall of Fame persistence  
✅ Modern, attractive UI with smooth animations  
✅ Fast loading and optimal performance  
✅ Accessibility compliance  
✅ Cross-browser compatibility  

## Development Priority
1. **Phase 1**: Core game mechanics and basic UI
2. **Phase 2**: Advanced animations and effects
3. **Phase 3**: Performance optimization and polish
4. **Phase 4**: Accessibility and testing

## Instructions for Gemini

You are an expert React developer. Please assist with the following tasks:

- Writing clean, idiomatic React (with Hooks).
- Refactoring code to improve performance and readability.
- Generating tests using Jest and React Testing Library.
- Writing or updating documentation in Markdown.
- Explaining unfamiliar code to a beginner-level developer.

Avoid suggesting class components. Use modern ES6+ syntax.
