
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { CompletedTaskCard } from '@/components/CompletedTaskCard';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

const CompletedTasks = () => {
  const { getCompletedTasks } = useAccountability();
  const completedTasks = getCompletedTasks();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Completed Tasks</h1>
      
      {completedTasks.length === 0 ? (
        <Card className="bg-muted/50">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No completed tasks yet</h3>
            <p className="text-muted-foreground">
              Complete tasks to see your achievements here!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedTasks.map((task) => (
            <CompletedTaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
