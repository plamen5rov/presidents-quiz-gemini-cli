// src/components/PresidentCard.tsx
import React, { useState, useEffect } from 'react';
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

const PresidentCard: React.FC<PresidentCardProps> = ({ 
  president, 
  isSelected, 
  isCorrect, 
  isTarget, 
  answerStatus, 
  onClick 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ripples, setRipples] = useState<React.CSSProperties[]>([]);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(president.portrait);

  // Reset state when president changes
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    setRetryCount(0);
    setImageSrc(president.portrait);
  }, [president.id, president.portrait]);

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

  const handleImageError = () => {
    console.error(`Failed to load image for ${president.name}: ${imageSrc}`);
    
    if (retryCount < 3) {
      // Try different cache-busting strategies
      const strategies = [
        `${president.portrait}?v=${Date.now()}`,
        `${president.portrait}?retry=${retryCount + 1}`,
        `${president.portrait}?t=${Math.random()}`,
        president.portrait // Final attempt without cache busting
      ];
      
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageSrc(strategies[retryCount]);
        setIsLoading(true);
        setImageError(false);
      }, 500 * (retryCount + 1)); // 500ms, 1s, 1.5s delays
    } else {
      setIsLoading(false);
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

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
      {isLoading && !imageError && <SkeletonCard />}
      
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 ${getBorderColor()} ${isLoading && !imageError ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative w-full" style={{ paddingTop: '100%' }}>
          {!imageError ? (
            <img
              src={imageSrc}
              alt={president.name}
              className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager" // Force immediate loading
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-t-lg">
              <div className="text-center p-2">
                <p className="text-red-500 text-sm font-medium mb-1">Image not available</p>
                <p className="text-gray-600 text-xs">{president.name}</p>
                <p className="text-gray-500 text-xs mt-1">Retried {retryCount} times</p>
                <p className="text-gray-400 text-xs mt-1 break-all">{president.portrait}</p>
              </div>
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
    </div>
  );
};

export default React.memo(PresidentCard);