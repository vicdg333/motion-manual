import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Home, Share2, Dumbbell, Timer, User } from 'lucide-react';
import { WorkoutData } from './WorkoutBuilder';
import { useToast } from '@/hooks/use-toast';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes?: string;
  type: 'weight' | 'bodyweight' | 'cardio';
}

interface WorkoutDay {
  day: number;
  title: string;
  exercises: Exercise[];
}

interface WorkoutResultsProps {
  workoutData: WorkoutData;
  onHome: () => void;
}

export const WorkoutResults: React.FC<WorkoutResultsProps> = ({ workoutData, onHome }) => {
  const { toast } = useToast();
  const [generatedWorkout] = useState<WorkoutDay[]>([
    {
      day: 1,
      title: "Upper Body Push",
      exercises: [
        { name: "Push-ups", sets: "3", reps: "8-12", type: "bodyweight" },
        { name: "Dumbbell Shoulder Press", sets: "3", reps: "10-12", type: "weight" },
        { name: "Dumbbell Chest Press", sets: "3", reps: "8-10", type: "weight" },
        { name: "Tricep Dips", sets: "2", reps: "8-10", type: "bodyweight" }
      ]
    },
    {
      day: 2,
      title: "Lower Body",
      exercises: [
        { name: "Goblet Squats", sets: "3", reps: "12-15", type: "weight" },
        { name: "Romanian Deadlifts", sets: "3", reps: "10-12", type: "weight" },
        { name: "Bulgarian Split Squats", sets: "2", reps: "8-10 each leg", type: "bodyweight" },
        { name: "Calf Raises", sets: "3", reps: "15-20", type: "bodyweight" }
      ]
    },
    {
      day: 3,
      title: "Upper Body Pull + Abs",
      exercises: [
        { name: "Bent-over Rows", sets: "3", reps: "8-10", type: "weight" },
        { name: "Lat Pulldowns", sets: "3", reps: "10-12", type: "weight" },
        { name: "Bicep Curls", sets: "2", reps: "10-12", type: "weight" },
        { name: "Plank Hold", sets: "3", reps: "30-45 sec", type: "bodyweight" }
      ]
    }
  ]);

  const handleCopyToClipboard = () => {
    const workoutText = generatedWorkout.map(day => 
      `DAY ${day.day} - ${day.title}\n${day.exercises.map(ex => 
        `• ${ex.name}: ${ex.sets} sets × ${ex.reps}`
      ).join('\n')}`
    ).join('\n\n');

    navigator.clipboard.writeText(workoutText);
    toast({
      title: "Copied to clipboard!",
      description: "Your workout routine has been copied.",
    });
  };

  const getExerciseIcon = (type: Exercise['type']) => {
    switch (type) {
      case 'weight':
        return <Dumbbell className="h-4 w-4 text-primary" />;
      case 'bodyweight':
        return <User className="h-4 w-4 text-gray-text" />;
      case 'cardio':
        return <Timer className="h-4 w-4 text-success" />;
      default:
        return <Dumbbell className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-gray-border p-4 z-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-center">Built just for you  😊</h1>
          <p className="text-sm text-gray-text text-center mt-1">
            {workoutData.daysPerWeek} days/week • {workoutData.fitnessLevel} • {workoutData.location}
          </p>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="p-4 pb-24 space-y-4">
        <div className="max-w-md mx-auto space-y-4">
          {generatedWorkout.map((day) => (
            <div key={day.day} className="bg-card border border-gray-border rounded-2xl p-6 shadow-sm animate-scale-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{day.day}</span>
                </div>
                <h3 className="text-lg font-semibold">{day.title}</h3>
              </div>

              <div className="space-y-3">
                {day.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                    <div className="mt-1">
                      {/* All icons black except bodyweight (gray) and cardio (success/green) */}
                      {exercise.type === 'weight' ? <Dumbbell className="h-4 w-4 text-black" /> :
                        exercise.type === 'bodyweight' ? <User className="h-4 w-4 text-gray-text" /> :
                        exercise.type === 'cardio' ? <Timer className="h-4 w-4 text-success" /> :
                        <Dumbbell className="h-4 w-4 text-black" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{exercise.name}</h4>
                      <p className="text-xs text-gray-text mt-1">
                        {exercise.sets} sets × {exercise.reps}
                      </p>
                      {exercise.notes && (
                        <p className="text-xs text-gray-text mt-1 italic">{exercise.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Tips */}
          <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 mt-2">
            <h4 className="font-semibold text-gray-700 mb-2">💡 Tips</h4>
            <ul className="text-sm text-gray-text space-y-1">
              <li>• Screenshot your routine so it’s ready at the gym</li>
              <li>• Stick to it: progress comes from consistency</li>
              <li>• If your goals (or attention span) shift, you can always make a new one</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Add extra bottom padding so the end does not disappear behind the fixed button bar */}
      <div className="pb-6" />

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-border p-4">
        <div className="max-w-md mx-auto space-y-3">
          
          <Button onClick={onHome} className="w-full">
            <Home className="h-4 w-4 mr-2" />
            Create another routine
          </Button>
        </div>
      </div>
    </div>
  );
};