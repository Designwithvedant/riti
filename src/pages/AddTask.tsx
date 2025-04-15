
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { TaskForm } from '@/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AddTask = () => {
  const { addTask } = useAccountability();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    try {
      addTask({
        ...data,
        recurringInterval: data.isRecurring ? data.recurringInterval || 1 : undefined,
      });
      toast({
        title: "Task created",
        description: "Your task was created successfully!"
      });
      navigate('/');
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error",
        description: "There was a problem creating your task",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Task</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create a Task</CardTitle>
          <CardDescription>
            Add a new task to track with Riti.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm 
            onSubmit={handleSubmit}
            submitLabel="Create Task"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTask;
