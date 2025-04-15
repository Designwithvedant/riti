
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { TaskForm } from '@/components/TaskForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EditTask = () => {
  const { tasks, editTask } = useAccountability();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const task = tasks.find(t => t.id === id);

  const handleSubmit = (data: any) => {
    if (task) {
      editTask({
        ...task,
        ...data,
      });
      navigate('/');
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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Task</h1>
      <Card>
        <CardHeader>
          <CardTitle>Update Task</CardTitle>
          <CardDescription>
            Make changes to your task details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm 
            defaultValues={{
              title: task.title,
              description: task.description,
              recurrence: task.recurrence,
              dueDate: new Date(task.dueDate),
              reward: task.reward,
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
