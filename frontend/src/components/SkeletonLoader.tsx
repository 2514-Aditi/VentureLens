import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-28 bg-[#E5E2DC]/40 dark:bg-[#262626] rounded-lg w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-32 bg-[#E5E2DC]/40 dark:bg-[#262626] rounded-lg" />
        <div className="h-32 bg-[#E5E2DC]/40 dark:bg-[#262626] rounded-lg" />
        <div className="h-32 bg-[#E5E2DC]/40 dark:bg-[#262626] rounded-lg" />
      </div>
      <div className="h-64 bg-[#E5E2DC]/40 dark:bg-[#262626] rounded-lg w-full" />
    </div>
  );
};
