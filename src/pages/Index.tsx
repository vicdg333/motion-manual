import React, { useState } from 'react';
import { Home } from './Home';
import { WorkoutBuilder, WorkoutData } from './WorkoutBuilder';
import { WorkoutResults } from './WorkoutResults';

type AppState = 'home' | 'builder' | 'results';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [workoutData, setWorkoutData] = useState<WorkoutData | null>(null);

  const handleStart = () => {
    setCurrentState('builder');
  };

  const handleComplete = (data: WorkoutData) => {
    setWorkoutData(data);
    setCurrentState('results');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setWorkoutData(null);
  };

  const handleBackToBuilder = () => {
    setCurrentState('home');
  };

  switch (currentState) {
    case 'home':
      return <Home onStart={handleStart} />;
    case 'builder':
      return (
        <WorkoutBuilder 
          onComplete={handleComplete} 
          onBack={handleBackToBuilder}
        />
      );
    case 'results':
      return workoutData ? (
        <WorkoutResults 
          workoutData={workoutData} 
          onHome={handleBackToHome}
        />
      ) : (
        <Home onStart={handleStart} />
      );
    default:
      return <Home onStart={handleStart} />;
  }
};

export default Index;
