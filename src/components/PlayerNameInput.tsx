// src/components/PlayerNameInput.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import HallOfFame from './HallOfFame';
import Image from 'next/image';

const PlayerNameInput = () => {
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();

  const handleStartGame = (e: FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      document.cookie = `playerName=${encodeURIComponent(playerName)}; path=/; max-age=86400`;
      router.push('/instructions');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Image
        src="/images/oval-office.jpg"
        alt="Oval Office"
        fill
        className="object-cover -z-10"
        priority
      />
      <header className="w-full bg-blue-900/90 py-4">
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <Image 
            src="/images/whitehouse.png" 
            alt="White House" 
            width={128} 
            height={128} 
            className="h-10 sm:h-16 md:h-24 lg:h-32 w-auto" 
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-9xl font-orbitron font-bold text-white text-center uppercase" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            U.S. Presidents Quiz
          </h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-md p-8 mt-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
          <form onSubmit={handleStartGame} className="space-y-6">
            <div>
              <label htmlFor="playerName" className="text-xl font-medium text-black">
                Enter Your Name:
              </label>
              <input
                id="playerName"
                name="playerName"
                type="text"
                required
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-600 text-gray-900 text-xl"
                placeholder="e.g., Jane Doe"
              />
            </div>
            <button
              type="submit"
              disabled={!playerName.trim()}
              className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              aria-label="Start the quiz"
            >
              ENTER
            </button>
          </form>
        </div>

        <div className="w-full max-w-md mt-8 mb-8">
          <HallOfFame />
        </div>
      </main>
      <footer className="w-full bg-red-800/90 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="text-white font-sans text-sm sm:text-base md:text-lg">
            This game is for educational purposes only and is not affiliated with any official organization. © {new Date().getFullYear()} <a href="mailto:biznetmen@gmail.com" className="underline hover:text-blue-300">Plamen Petrov</a>.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/biznetmen/" target="_blank" rel="noopener noreferrer" aria-label="Facebook page for Plamen Petrov">
              <Image src="/images/facebook.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://github.com/plamen5rov" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile for Plamen Petrov">
              <Image src="/images/github.svg" alt="GitHub" width={24} height={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlayerNameInput;
