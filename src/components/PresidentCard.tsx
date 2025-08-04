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
  onClick: () => void;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president, isSelected, isCorrect, isTarget, answerStatus, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ripples, setRipples] = useState<React.CSSProperties[]>([]);

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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick();
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: React.CSSProperties = {
      top: y,
      left: x,
      width: size,
      height: size,
    };

    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples(ripples.slice(1));
    }, 600);
  };

  return (
    <div className="relative" onClick={handleClick}>
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
           {ripples.map((style, index) => (
            <span key={index} className="ripple" style={style} />
          ))}
        </div>
        <div className="p-2 text-center">
          {/* Name removed for quiz */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PresidentCard);


