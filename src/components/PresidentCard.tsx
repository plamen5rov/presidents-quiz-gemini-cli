// src/components/PresidentCard.tsx
import { useState, type FC, type CSSProperties, type MouseEvent, type KeyboardEvent } from 'react';
import Image from 'next/image';
import type { President } from '@/data/presidents';
import SkeletonCard from './SkeletonCard';

interface PresidentCardProps {
  president: President;
  isSelected: boolean;
  isCorrect: boolean;
  isTarget: boolean;
  answerStatus: 'correct' | 'incorrect' | 'idle';
  onClick: () => void;
  index: number;
}

const PresidentCard: FC<PresidentCardProps> = ({ 
  president, 
  isSelected, 
  isCorrect, 
  isTarget, 
  answerStatus, 
  onClick,
  index,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ripples, setRipples] = useState<CSSProperties[]>([]);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [imageSrc, setImageSrc] = useState(president.portrait);

  

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

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    onClick();
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: CSSProperties = {
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
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Failed to load image for ${president.name}: ${imageSrc}`);
    }
    
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  const answerLabel = answerStatus !== 'idle' && isSelected
    ? (isCorrect ? 'Correct' : 'Incorrect')
    : '';
  const isPressed = answerStatus !== 'idle' && isSelected;

  return (
    <div 
      className="relative focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-blue-900 rounded-lg" 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Select ${president.name}${answerLabel ? ` - ${answerLabel}` : ''}`}
      aria-pressed={isPressed || undefined}
    >
      {isLoading && !imageError && <div aria-hidden="true"><SkeletonCard /></div>}
      
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 ${getBorderColor()} ${isLoading && !imageError ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="relative w-full" style={{ paddingTop: '100%' }}>
          {!imageError ? (
            <Image
              src={imageSrc}
              alt={president.name}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
              className="object-cover rounded-t-lg"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={index < 3}
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
        
        <div className="p-2 text-center" aria-hidden="true">
          {answerLabel && (
            <span className={`text-xs font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {answerLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresidentCard;