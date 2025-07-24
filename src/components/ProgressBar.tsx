import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full", className)} aria-label="Progress">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-black h-2 rounded-full transition-all duration-200 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};