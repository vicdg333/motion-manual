import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ background: '#FCF8F5' }}>
      <div className="text-center max-w-none mx-auto animate-fade-up">
        {/* App Logo/Icon */}
        <div className="mx-auto flex items-center justify-center mb-12">
          <img src="/icon.png" alt="App icon" className="w-60 h-60 sm:w-80 sm:h-80 md:w-[18rem] md:h-[18rem] lg:w-[20rem] lg:h-[20rem] object-contain" />
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
            className="w-full group rounded-lg px-4"
          >
            <span className="text-base font-normal text-white">Create new routine</span>
          </Button>
        </div>
        
      </div>
    </div>
  );
};