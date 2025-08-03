// src/components/PresidentCard.tsx
import React from 'react';
import Image from 'next/image';
import { President } from '@/data/presidents';

interface PresidentCardProps {
  president: President;
}

const PresidentCard: React.FC<PresidentCardProps> = ({ president }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="relative w-full" style={{ paddingTop: '125%' }}> {/* 4:5 Aspect Ratio */}
        <Image
          src={president.portrait}
          alt={president.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-2 text-center">
        <p className="text-sm font-semibold text-gray-800">{president.name}</p>
      </div>
    </div>
  );
};

export default PresidentCard;
