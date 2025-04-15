
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { TaskForm } from '@/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const { addTask } = useAccountability();
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    addTask({
      ...data,
      recurringInterval: data.isRecurring ? data.recurringInterval || 1 : undefined,
    });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Task</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create a Task</CardTitle>
          <CardDescription>
            Add a new task to track. You'll need to provide proof of completion to earn coins.
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
