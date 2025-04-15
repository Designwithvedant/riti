
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { TaskCard } from '@/components/TaskCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { TaskRecurrence } from '@/contexts/AccountabilityContext';
import { cn } from '@/lib/utils';

const TasksByType = () => {
  const { type } = useParams<{ type: string }>();
  const { getDailyTasks, getWeeklyTasks, getMonthlyTasks, deleteTask } = useAccountability();
  const navigate = useNavigate();
  
  // Validate the type parameter
  const validType = ['daily', 'weekly', 'monthly'].includes(type || '') ? 
    type as TaskRecurrence : 'daily';

  // Get tasks based on type
  const getTasks = () => {
    switch(validType) {
      case 'daily':
        return getDailyTasks();
      case 'weekly':
        return getWeeklyTasks();
      case 'monthly':
        return getMonthlyTasks();
      default:
        return [];
    }
  };

  const tasks = getTasks();

  // Get title and color based on type
  const getTitle = () => {
    switch(validType) {
      case 'daily':
        return 'Daily Tasks';
      case 'weekly':
        return 'Weekly Tasks';
      case 'monthly':
        return 'Monthly Tasks';
      default:
        return 'Tasks';
    }
  };

  const getBgColor = () => {
    switch(validType) {
      case 'daily':
        return 'bg-task-daily/10';
      case 'weekly':
        return 'bg-task-weekly/10';
      case 'monthly':
        return 'bg-task-monthly/10';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{getTitle()}</h1>
        <Button onClick={() => navigate("/add")}>
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </Button>
      </div>

      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
            />
          ))
        ) : (
          <Card className={cn("col-span-full", getBgColor())}>
            <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
              <p className="text-muted-foreground mb-4">
                No {validType} tasks yet. Add some to get started!
              </p>
              <Button onClick={() => navigate("/add")} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add {validType.charAt(0).toUpperCase() + validType.slice(1)} Task
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TasksByType;
