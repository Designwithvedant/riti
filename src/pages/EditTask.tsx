
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { TaskForm } from '@/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const EditTask = () => {
  const { tasks, editTask } = useAccountability();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const task = tasks.find(t => t.id === id);

  const handleSubmit = (data: any) => {
    if (task) {
      try {
        editTask({
          ...task,
          ...data,
          recurringInterval: data.isRecurring ? data.recurringInterval || 1 : undefined,
        });
        toast({
          title: "Task updated",
          description: "Your task was updated successfully!"
        });
        navigate('/');
      } catch (error) {
        console.error("Error updating task:", error);
        toast({
          title: "Error",
          description: "There was a problem updating your task",
          variant: "destructive"
        });
      }
    }
  };

  if (!task) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The task you're trying to edit doesn't exist or has been deleted.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Extract time from the due date for the form
  const dueTime = format(task.dueDate, 'HH:mm');

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
      <Card>
        <CardHeader>
          <CardTitle>Update Task</CardTitle>
          <CardDescription>
            Make changes to your task details including due date and time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm 
            defaultValues={{
              title: task.title,
              description: task.description,
              recurrence: task.recurrence,
              dueDate: new Date(task.dueDate),
              dueTime: task.dueTime || dueTime,
              reward: task.reward,
              isRecurring: !!task.isRecurring,
              recurringInterval: task.recurringInterval || 1,
            }}
            onSubmit={handleSubmit}
            submitLabel="Update Task"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default EditTask;
