
import React, { useState } from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Coins, Trophy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ImageUpload } from '@/components/ImageUpload';
import { cn } from '@/lib/utils';

const CompleteTask = () => {
  const { tasks, completeTask } = useAccountability();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const task = tasks.find(t => t.id === id);

  const handleImageCapture = (imageData: string) => {
    setProofImage(imageData);
  };

  const handleSubmit = () => {
    if (task && proofImage) {
      setIsSubmitting(true);
      
      // Simulate a short delay to show loading state
      setTimeout(() => {
        completeTask(task.id, proofImage);
        setIsCompleted(true);
        setIsSubmitting(false);
      }, 1000);
    }
  };

  if (!task) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The task you're trying to complete doesn't exist or has been deleted.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (task.completed) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Already Completed</AlertTitle>
          <AlertDescription>
            This task has already been completed!
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-primary/5 border-primary animate-task-complete">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <Trophy className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-2">Task Completed!</h2>
            <p className="text-lg mb-4">
              You've earned <span className="font-bold">{task.reward}</span> coins
            </p>
            <div className="flex items-center text-lg font-medium text-currency mb-6">
              <Coins className="h-6 w-6 mr-2" />
              <span>Good job keeping yourself accountable!</span>
            </div>
            <Button onClick={() => navigate('/')} size="lg">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complete Task</h1>
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>
            Upload proof of completion to earn {task.reward} coins
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Task Description:</h3>
            <p>{task.description}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Upload Proof:</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Take a photo or upload an image that proves you've completed this task.
            </p>
            <ImageUpload onImageCapture={handleImageCapture} />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className={cn("w-full", proofImage ? "" : "opacity-50")}
            onClick={handleSubmit}
            disabled={!proofImage || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Complete Task & Earn Coins"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompleteTask;
