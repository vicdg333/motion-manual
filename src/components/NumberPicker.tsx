import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  label?: React.ReactNode;
}

export const NumberPicker: React.FC<NumberPickerProps> = ({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
  label
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn("flex flex-col items-center gap-4 max-w-[375px] w-full", className)}>
      {label && <span className="text-sm font-medium text-black font-sans w-full text-center mb-2">{label}</span>}
      <div className="flex flex-row items-center justify-center gap-8 w-full">
        <Button
          variant="default"
          size="icon"
          onClick={handleDecrement}
          disabled={value <= min}
          className="!rounded-full !w-6 !h-6 !p-0 bg-black border-0 flex items-center justify-center"
        >
          <Minus className="h-4 w-4 text-white" />
        </Button>
        <span className="text-5xl font-semibold font-sans text-black text-center select-none">
          {value}
        </span>
        <Button
          variant="default"
          size="icon"
          onClick={handleIncrement}
          disabled={value >= max}
          className="!rounded-full !w-6 !h-6 !p-0 bg-black border-0 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
};