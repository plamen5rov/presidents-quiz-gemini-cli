// src/components/SkeletonCard.tsx
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="w-full bg-gray-200 animate-pulse" style={{ paddingTop: '125%' }} />
      <div className="p-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
