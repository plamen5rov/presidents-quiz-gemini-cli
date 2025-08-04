// src/components/PresidentCard.tsx
import React, { useState, useEffect } from 'react';
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
  const [imageKey, setImageKey] = useState(0); // Force image reload

  // Reset state when president changes
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    setRetryCount(0);
    setImageKey(prev => prev + 1);
  }, [president.id]);

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
    console.warn(`Failed to load image for ${president.name}: ${president.portrait}`);
    
    if (retryCount < 2) {
      // Retry loading the image
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageKey(prev => prev + 1);
        setIsLoading(true);
        setImageError(false);
      }, 1000 * (retryCount + 1)); // Exponential backoff: 1s, 2s
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

  // Create a cache-busted URL for problematic images
  const getImageSrc = () => {
    const baseUrl = president.portrait;
    if (retryCount > 0) {
      return `${baseUrl}?retry=${retryCount}&key=${imageKey}`;
    }
    return baseUrl;
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
            <Image
              key={imageKey} // Force re-render when imageKey changes
              src={getImageSrc()}
              alt={president.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={false} // Let Next.js handle priority
              unoptimized={retryCount > 0} // Disable optimization for retries
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-t-lg">
              <div className="text-center p-2">
                <p className="text-red-500 text-sm font-medium mb-1">Image not available</p>
                <p className="text-gray-600 text-xs">{president.name}</p>
                {retryCount > 0 && (
                  <p className="text-gray-500 text-xs mt-1">Retried {retryCount} times</p>
                )}
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