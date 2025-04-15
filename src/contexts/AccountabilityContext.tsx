import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { addDays, addWeeks, addMonths, format } from 'date-fns';

export type TaskRecurrence = 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  title: string;
  description: string;
  recurrence: TaskRecurrence;
  dueDate: Date;
  completed: boolean;
  proofImage?: string;
  completedAt?: Date;
  reward: number;
  isRecurring?: boolean;
  recurringInterval?: number;
}

interface AccountabilityContextType {
  tasks: Task[];
  currency: number;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  completeTask: (id: string, proofImage: string) => void;
  deleteTask: (id: string) => void;
  editTask: (task: Task) => void;
  getDailyTasks: () => Task[];
  getWeeklyTasks: () => Task[];
  getMonthlyTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getUpcomingTasks: () => Task[];
}

const AccountabilityContext = createContext<AccountabilityContextType | undefined>(undefined);

const LOCAL_STORAGE_TASKS_KEY = 'accountability_tasks';
const LOCAL_STORAGE_CURRENCY_KEY = 'accountability_currency';

export const AccountabilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currency, setCurrency] = useState<number>(0);

  useEffect(() => {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      const tasksWithDates = parsedTasks.map((task: any) => ({
        ...task,
        dueDate: new Date(task.dueDate),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
      setTasks(tasksWithDates);
    }

    const savedCurrency = localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY);
    if (savedCurrency) {
      setCurrency(Number(savedCurrency));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, String(currency));
  }, [currency]);

  const addTask = (task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}`,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    toast({
      title: "Task Added",
      description: `${newTask.title} has been added to your tasks.`,
    });
  };

  const completeTask = (id: string, proofImage: string) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      const task = tasks[taskIndex];
      
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = {
        ...task,
        completed: true,
        proofImage,
        completedAt: new Date(),
      };
      
      if (task.isRecurring && task.recurringInterval && task.recurringInterval > 0) {
        const nextDueDate = calculateNextDueDate(task.dueDate, task.recurrence, task.recurringInterval);
        
        const recurringTask: Task = {
          ...task,
          id: `task_${Date.now()}`,
          dueDate: nextDueDate,
          completed: false,
          proofImage: undefined,
          completedAt: undefined,
        };
        
        updatedTasks.push(recurringTask);
        
        toast({
          title: "Recurring Task Created",
          description: `A new recurring task has been created for ${format(nextDueDate, 'PPP')}.`,
        });
      }
      
      setTasks(updatedTasks);
      setCurrency(prev => prev + task.reward);
      
      toast({
        title: "Task Completed! 🎉",
        description: `You earned ${task.reward} coins for completing ${task.title}.`,
      });
    }
  };

  const calculateNextDueDate = (currentDueDate: Date, recurrence: TaskRecurrence, interval: number): Date => {
    const date = new Date(currentDueDate);
    switch (recurrence) {
      case 'daily':
        return addDays(date, interval);
      case 'weekly':
        return addWeeks(date, interval);
      case 'monthly':
        return addMonths(date, interval);
      default:
        return date;
    }
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Task Deleted",
        description: `${taskToDelete.title} has been deleted.`,
      });
    }
  };

  const editTask = (updatedTask: Task) => {
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = updatedTask;
      setTasks(updatedTasks);
      
      toast({
        title: "Task Updated",
        description: `${updatedTask.title} has been updated.`,
      });
    }
  };

  const getDailyTasks = () => tasks.filter(task => task.recurrence === 'daily' && !task.completed);
  
  const getWeeklyTasks = () => tasks.filter(task => task.recurrence === 'weekly' && !task.completed);
  
  const getMonthlyTasks = () => tasks.filter(task => task.recurrence === 'monthly' && !task.completed);
  
  const getCompletedTasks = () => tasks.filter(task => task.completed);
  
  const getUpcomingTasks = () => {
    const now = new Date();
    return tasks
      .filter(task => !task.completed && task.dueDate > now)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  };

  return (
    <AccountabilityContext.Provider
      value={{
        tasks,
        currency,
        addTask,
        completeTask,
        deleteTask,
        editTask,
        getDailyTasks,
        getWeeklyTasks,
        getMonthlyTasks,
        getCompletedTasks,
        getUpcomingTasks,
      }}
    >
      {children}
    </AccountabilityContext.Provider>
  );
};

export const useAccountability = () => {
  const context = useContext(AccountabilityContext);
  if (context === undefined) {
    throw new Error('useAccountability must be used within an AccountabilityProvider');
  }
  return context;
};
