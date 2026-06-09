// src/components/Instructions.tsx
'use client';

import { useRouter } from 'next/navigation';

const Instructions = () => {
  const router = useRouter();

  const rules = [
    {
      title: '10 Levels',
      desc: 'Progress through 10 rounds, each with a new president to identify.',
    },
    {
      title: '10 Seconds per Round',
      desc: 'A timer counts down — think fast!',
    },
    {
      title: 'Match the Portrait',
      desc: "A president's name and years in office appear. Tap the correct face.",
    },
    {
      title: 'Scoring',
      desc: '+10 points for a correct answer. No penalty for wrong guesses or timeouts.',
    },
    {
      title: 'Hall of Fame',
      desc: 'Your final score and time are ranked. Compete for the top spot!',
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-red-900 p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-black/50 rounded-xl shadow-2xl text-white border border-white/10">
        <h2 className="text-4xl font-bold text-center mb-2">Game Rules</h2>
        <p className="text-center text-gray-300 mb-6">Learn the basics in 30 seconds</p>
        
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div
              key={rule.title}
              className="group flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 border border-white/5"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {rule.title}
                </h3>
                <p className="text-gray-300 mt-1 leading-relaxed">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-10 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-4 font-bold text-white bg-gray-700/50 rounded-lg shadow-md hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-white/10"
          >
            BACK
          </button>
          <button
            type="button"
            onClick={() => router.push('/game')}
            className="flex-1 px-6 py-4 font-bold text-white bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg shadow-md hover:shadow-xl hover:from-green-700 hover:to-emerald-800 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Instructions;