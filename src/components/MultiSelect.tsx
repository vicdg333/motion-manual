import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  className
}) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={cn("flex flex-wrap justify-center gap-3", className)}>
      {options.map((option) => (
        <Button
          key={option}
          variant={selected.includes(option) ? "selected" : "outline"}
          size="pill"
          onClick={() => toggleOption(option)}
          className={cn(
            "!w-auto rounded-2xl py-4 !px-6 text-center font-sans !font-light border transition-all duration-200 ease-in-out",
            selected.includes(option) ? "border-black bg-black text-white" : "border-gray-200 bg-white text-black hover:border-black hover:bg-gray-50",
            "text-base"
          )}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};