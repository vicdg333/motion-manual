import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SingleSelectProps {
  options: string[];
  selected: string | null;
  onChange: (selected: string) => void;
  className?: string;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  selected,
  onChange,
  className
}) => {
  const isTwoOptions = options.length === 2;
  return (
    <div className={cn(isTwoOptions ? "flex flex-row gap-4 justify-center w-full" : "space-y-3 flex flex-col items-center", className)}>
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option ? "selected" : "outline"}
          onClick={() => onChange(option)}
          className={cn(
            "!w-auto min-w-[120px] rounded-2xl py-2 !px-6 text-center font-sans !font-light border transition-all duration-200 ease-in-out",
            selected === option ? "border-black bg-black text-white" : "border-gray-200 bg-white text-black hover:border-black hover:bg-gray-50",
            "text-base"
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};