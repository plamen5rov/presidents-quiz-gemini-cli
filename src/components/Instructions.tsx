// src/components/Instructions.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const RuleItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <svg className="w-6 h-6 mr-3 text-green-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    <span>{children}</span>
  </li>
);

const SubRuleItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
        <svg className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        <span>{children}</span>
    </li>
);

const Instructions = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-red-900 p-4">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-black/50 rounded-lg shadow-lg text-white">
        <h2 className="text-4xl font-bold text-center mb-6">Game Rules</h2>
        <ul className="space-y-4 text-xl">
          <RuleItem>The game consists of 10 levels.</RuleItem>
          <RuleItem>In each level, you have 10 seconds to guess the correct president.</RuleItem>
          <RuleItem>A name and years of service will be displayed. Click the matching portrait.</RuleItem>
          <RuleItem>
            <strong>Scoring:</strong>
            <ul className="pl-6 space-y-2 mt-2">
              <SubRuleItem>+10 points for a correct answer.</SubRuleItem>
              <SubRuleItem>0 points for an incorrect answer or if time runs out.</SubRuleItem>
            </ul>
          </RuleItem>
          <RuleItem>Your final score and time will be ranked in the Hall of Fame.</RuleItem>
        </ul>
        <Link href="/game" passHref>
          <button className="w-full px-4 py-3 mt-8 font-bold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 transform hover:-translate-y-0.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            START GAME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Instructions;