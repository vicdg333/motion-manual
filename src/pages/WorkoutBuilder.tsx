import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { SingleSelect } from '@/components/SingleSelect';
import { MultiSelect } from '@/components/MultiSelect';
import { NumberPicker } from '@/components/NumberPicker';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export interface WorkoutData {
  fitnessLevel: string;
  location: string;
  daysPerWeek: number;
  mainGoal: string;
  workoutSplit: string;
  lowerBodyFocus: string[];
  lowerBodyAvoid: string[];
  upperBodyFocus: string[];
  upperBodyAvoid: string[];
  includeAbs: boolean;
  absType: string;
  upperBodyExercises: number;
  lowerBodyExercises: number;
  absExercises: number;
  extraNotes: string;
}

interface WorkoutBuilderProps {
  onComplete: (data: WorkoutData) => void;
  onBack: () => void;
}

export const WorkoutBuilder: React.FC<WorkoutBuilderProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    fitnessLevel: '',
    location: '',
    daysPerWeek: 3,
    mainGoal: '',
    workoutSplit: '',
    lowerBodyFocus: [],
    lowerBodyAvoid: [],
    upperBodyFocus: [],
    upperBodyAvoid: [],
    includeAbs: null,
    absType: '',
    upperBodyExercises: 4,
    lowerBodyExercises: 4,
    absExercises: 3,
    extraNotes: ''
  });

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(workoutData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return workoutData.fitnessLevel && workoutData.location && workoutData.mainGoal;
      case 2:
        return workoutData.workoutSplit;
      case 3:
        return true; // Optional selections
      case 4:
        return true; // Optional selections
      case 5:
        return true; // Optional selection
      case 6:
        return true; // Has defaults
      case 7:
        return true; // Optional notes
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-14 flex flex-col items-center text-center w-full">
            <div className="space-y-4 w-full">
              <h2 className="text-xl font-semibold w-full">What's your fitness level?</h2>
              <SingleSelect
                options={['Beginner', 'Intermediate', 'Advanced']}
                selected={workoutData.fitnessLevel}
                onChange={(value) => setWorkoutData({ ...workoutData, fitnessLevel: value })}
                className="w-full"
              />
            </div>

            <div className="space-y-4 w-full">
              <h2 className="text-xl font-semibold w-full">Where will you work out?</h2>
              <SingleSelect
                options={['At home', 'At the gym']}
                selected={workoutData.location}
                onChange={(value) => setWorkoutData({ ...workoutData, location: value })}
                className="w-full"
              />
            </div>

            <div className="space-y-4 w-full flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold w-full">How many workouts per week?</h2>
              <div className="flex justify-center w-full">
                <NumberPicker
                  value={workoutData.daysPerWeek}
                  onChange={(value) => setWorkoutData({ ...workoutData, daysPerWeek: value })}
                  min={1}
                  max={7}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4 w-full">
              <h2 className="text-xl font-semibold w-full">What's your main fitness goal?</h2>
              <SingleSelect
                options={[
                  'Build muscle',
                  'Lose fat',
                  'Maintain general fitness',
                  'Improve endurance and performance'
                ]}
                selected={workoutData.mainGoal}
                onChange={(value) => setWorkoutData({ ...workoutData, mainGoal: value })}
                className="w-full"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 flex flex-col items-center text-center w-full">
            <h2 className="text-xl font-semibold w-full">What kind of split do you prefer?</h2>
            <SingleSelect
              options={[
                'Full body',
                'Upper body / Lower body',
                'Push / Pull / Legs',
                'Custom',
                'Let AI decide'
              ]}
              selected={workoutData.workoutSplit}
              onChange={(value) => setWorkoutData({ ...workoutData, workoutSplit: value })}
              className="w-full [&>button]:py-2 [&>button]:px-2"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 flex flex-col items-center text-center w-full">
            <div className="space-y-4 w-full">
              <h2 className="text-xl font-semibold w-full">Which lower body areas would you like to focus on?</h2>
              <p className="text-sm text-gray-text w-full">Select all that apply</p>
              <MultiSelect
                options={['No preference', 'Glutes', 'Hamstrings', 'Quads', 'Calves']}
                selected={workoutData.lowerBodyFocus}
                onChange={(value) => setWorkoutData({ ...workoutData, lowerBodyFocus: value })}
                className="w-full [&>button]:py-2 [&>button]:px-2"
              />
            </div>

            <div className="space-y-4 w-full">
              <h2 className="text-xl font-semibold w-full">Any areas you don't want to focus on?</h2>
              <p className="text-sm text-gray-text w-full">Select all that apply</p>
              <MultiSelect
                options={['Glutes', 'Hamstrings', 'Quads', 'Calves', 'None']}
                selected={workoutData.lowerBodyAvoid}
                onChange={(value) => setWorkoutData({ ...workoutData, lowerBodyAvoid: value })}
                className="w-full [&>button]:py-2 [&>button]:px-2"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 flex flex-col items-center text-center w-full">
            <div className="space-y-4 w-full flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold w-full">Which upper body areas would you like to focus on?</h2>
              <p className="text-sm text-gray-text w-full">Select all that apply</p>
              <MultiSelect
                options={['No preference', 'Back', 'Shoulders', 'Triceps', 'Chest', 'Biceps']}
                selected={workoutData.upperBodyFocus}
                onChange={(value) => setWorkoutData({ ...workoutData, upperBodyFocus: value })}
                className="w-full justify-center"
              />
            </div>

            <div className="space-y-4 w-full flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold w-full">Any areas you don't want to focus on?</h2>
              <p className="text-sm text-gray-text w-full">Select all that apply</p>
              <MultiSelect
                options={['Back', 'Shoulders', 'Triceps', 'Chest', 'Biceps', 'None']}
                selected={workoutData.upperBodyAvoid}
                onChange={(value) => setWorkoutData({ ...workoutData, upperBodyAvoid: value })}
                className="w-full justify-center"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 flex flex-col items-center text-center w-full">
            <div className="space-y-4 w-full flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold w-full">Would you like to include ab exercises?</h2>
              <SingleSelect
                options={['Yes', 'No']}
                selected={workoutData.includeAbs === true ? 'Yes' : workoutData.includeAbs === false ? 'No' : null}
                onChange={value => setWorkoutData({ ...workoutData, includeAbs: value === 'Yes' ? true : value === 'No' ? false : null })}
                className="flex flex-row gap-4 justify-center"
              />
            </div>

            {workoutData.includeAbs && (
              <div className="space-y-4 w-full flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold w-full">What kind of ab training do you prefer?</h2>
                <SingleSelect
                  options={['With weights', 'Without weights', 'Mix of both']}
                  selected={workoutData.absType}
                  onChange={(value) => setWorkoutData({ ...workoutData, absType: value })}
                  className="w-full max-w-xs"
                />
              </div>
            )}
          </div>
        );
      case 6:
        return (
          <div className="space-y-6 flex flex-col items-center text-center w-full">
            <h2 className="text-xl font-semibold w-full">How many exercises per set?</h2>
            <div className="space-y-6 w-full flex flex-col items-center text-center">
              <NumberPicker
                label={<span className="font-light">Upper body days</span>}
                value={workoutData.upperBodyExercises}
                onChange={(value) => setWorkoutData({ ...workoutData, upperBodyExercises: value })}
                min={2}
                max={8}
              />
              <NumberPicker
                label={<span className="font-light">Lower body days</span>}
                value={workoutData.lowerBodyExercises}
                onChange={(value) => setWorkoutData({ ...workoutData, lowerBodyExercises: value })}
                min={2}
                max={8}
              />
              {workoutData.includeAbs && (
                <NumberPicker
                  label="Ab exercises"
                  value={workoutData.absExercises}
                  onChange={(value) => setWorkoutData({ ...workoutData, absExercises: value })}
                  min={1}
                  max={6}
                />
              )}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Any extra notes?</h2>
            <p className="text-sm text-gray-text">Time to mention any injuries, equipment loves (or hates), non-negotiables, etc.</p>
            <Textarea
              placeholder={'e.g., “I have a knee injury”, “I want huge glutes”, or “don’t ever mention the word ‘burpees’”'}
              value={workoutData.extraNotes}
              onChange={(e) => setWorkoutData({ ...workoutData, extraNotes: e.target.value })}
              className="min-h-[120px] rounded-2xl border-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background border-b border-gray-border p-4 z-10">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="p-6 pb-24 animate-fade-up">
        <div className="max-w-md mx-auto">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-border p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1"
          >
            {currentStep === totalSteps ? 'Generate my routine' : 'Next'}
            {currentStep < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};