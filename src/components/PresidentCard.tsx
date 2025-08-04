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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  const [imageError, setImageError] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <div 
      className="relative" 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Select ${president.name}`}
    >
      {isLoading && <SkeletonCard />}
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 ${getBorderColor()} ${isLoading || imageError ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative w-full" style={{ paddingTop: '100%' }}>
          {!imageError ? (
            <Image
              src={president.portrait}
              alt={president.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setImageError(true);
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <p className="text-red-500 text-center">Image not available</p>
            </div>
          )}
           {ripples.map((style, index) => (
            <span key={index} className="ripple" style={style} />
          ))}
        </div>
        <div className="p-2 text-center">
          {/* Name removed for quiz */}
        </div>
      </div>
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
          <p className="text-red-500 text-center">Image not available</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(PresidentCard);


