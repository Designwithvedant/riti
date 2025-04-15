
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, Coins, Edit, Trash2 } from 'lucide-react';
import { Task, TaskRecurrence } from '@/contexts/AccountabilityContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const navigate = useNavigate();
  
  const getRecurrenceBadgeStyle = (recurrence: TaskRecurrence) => {
    switch(recurrence) {
      case 'daily':
        return 'bg-task-daily text-white';
      case 'weekly':
        return 'bg-task-weekly text-white';
      case 'monthly':
        return 'bg-task-monthly text-white';
      default:
        return '';
    }
  };

  const daysUntilDue = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    return `Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
  };

  const handleComplete = () => {
    navigate(`/complete/${task.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      new Date(task.dueDate) < new Date() && !task.completed && "border-destructive border-2"
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
          <Badge className={cn(getRecurrenceBadgeStyle(task.recurrence))}>
            {task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{format(new Date(task.dueDate), 'PPP')}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{daysUntilDue()}</span>
        </div>
        <div className="flex items-center text-sm">
          <Coins className="h-4 w-4 mr-1 text-currency" />
          <span className="font-medium">{task.reward} coins reward</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(task.id)} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
        <Button size="sm" onClick={handleComplete} disabled={task.completed}>
          {task.completed ? 'Completed' : 'Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};
