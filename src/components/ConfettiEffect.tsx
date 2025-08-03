// src/components/ConfettiEffect.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (trigger && canvasRef.current) {
      const myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });
      
      myConfetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 }
      });
    }
  }, [trigger]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default ConfettiEffect;
