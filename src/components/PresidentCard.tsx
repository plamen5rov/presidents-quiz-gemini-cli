// src/components/PresidentCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { President } from '@/data/presidents';
import SkeletonCard from './SkeletonCard';

interface PresidentCardProps {
  president: President;
  isSelected: boolean;
  isCorrect: boolean;
  isTarget: boolean;
  answerStatus: 'correct' | 'incorrect' | 'idle';
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, isSelected, isCorrect, isTarget, answerStatus }) => {
  const [isLoading, setIsLoading] = useState(true);

  const getBorderColor = () => {
    if (answerStatus === 'idle') {
      return 'border-transparent';
    }
    if (isSelected) {
      return isCorrect ? 'border-green-500' : 'border-red-500';
    }
    if (isTarget) {
      return 'border-green-500';
    }
    return 'border-transparent';
  };

  return (
    <div className="relative">
      {isLoading && <SkeletonCard />}
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 ${getBorderColor()} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative w-full" style={{ paddingTop: '100%' }}>
          <Image
            src={president.portrait}
            alt={president.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <div className="p-2 text-center">
          {/* Name removed for quiz */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PresidentCard);


