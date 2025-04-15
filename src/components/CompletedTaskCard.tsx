
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Calendar, Clock, Coins } from 'lucide-react';
import { Task, TaskRecurrence } from '@/contexts/AccountabilityContext';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface CompletedTaskCardProps {
  task: Task;
}

export const CompletedTaskCard: React.FC<CompletedTaskCardProps> = ({ task }) => {
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

  return (
    <Card className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold">{task.title}</h3>
          <Badge className={cn(getRecurrenceBadgeStyle(task.recurrence))}>
            {task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Completed on {task.completedAt ? format(new Date(task.completedAt), 'PPP') : 'Unknown'}</span>
        </div>
        <div className="flex items-center text-sm">
          <Coins className="h-4 w-4 mr-1 text-currency" />
          <span className="font-medium">{task.reward} coins earned</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        {task.proofImage && (
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full cursor-pointer">
                <div className="relative w-full h-24 bg-muted rounded-md overflow-hidden">
                  <img 
                    src={task.proofImage} 
                    alt="Proof of completion" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-medium">
                    View Proof
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <div className="w-full max-h-[80vh] overflow-auto">
                <img 
                  src={task.proofImage} 
                  alt="Proof of completion" 
                  className="w-full h-auto" 
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};
