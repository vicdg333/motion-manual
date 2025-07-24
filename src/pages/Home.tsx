import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-sm mx-auto animate-fade-up">
        {/* App Logo/Icon */}
        <div className="mx-auto flex items-center justify-center">
          <img src="/icon.png" alt="App icon" className="w-64 h-64 object-contain" />
        </div>
        
        {/* App Name & Tagline */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground">
            {/* To use Lora, ensure it's imported in your global CSS or via Google Fonts */}
            <span className="font-[Lora] font-bold">The Motion Manual</span>
          </h1>
          <p className="text-lg text-gray-text leading-relaxed">
            Customized workout plans. Because you could wing it, but why would you?
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="mt-8">
          <Button
            variant="selected"
            size="lg"
            onClick={onStart}
            className="w-full group rounded-xl px-4 !font-normal"
          >
            Create new routine
          </Button>
        </div>
        
        {/* Subtitle */}
        <p className="text-sm text-gray-text mt-8">
          Yes, you can choose everything. No, it’s not that deep.
        </p>
      </div>
    </div>
  );
};