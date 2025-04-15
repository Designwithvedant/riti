
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Task, TaskRecurrence } from '@/contexts/AccountabilityContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, RepeatIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

const taskFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }).max(50),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }).max(500),
  recurrence: z.enum(['daily', 'weekly', 'monthly']),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
  reward: z.number().min(1, {
    message: "Reward must be at least 1 coin.",
  }).max(100),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.number().min(1).max(30).optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  defaultValues?: Partial<TaskFormValues>;
  onSubmit: (data: TaskFormValues) => void;
  submitLabel: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  defaultValues = {
    title: '',
    description: '',
    recurrence: 'daily',
    dueDate: new Date(),
    reward: 10,
    isRecurring: false,
    recurringInterval: 1,
  },
  onSubmit,
  submitLabel,
}) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    // Ensure the form properly recognizes dates
    mode: "onChange"
  });

  const watchIsRecurring = form.watch("isRecurring");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title..." {...field} />
              </FormControl>
              <FormDescription>
                The title of your task, e.g. "Go to the gym"
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your task in more detail..." 
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="recurrence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-full pl-3 text-left font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward (coins)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="100" 
                  {...field} 
                  onChange={e => field.onChange(Number(e.target.value))} 
                />
              </FormControl>
              <FormDescription>
                Set a reward for completing this task (1-100 coins)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Recurring task options */}
        <div className="space-y-4 border p-4 rounded-lg">
          <FormField
            control={form.control}
            name="isRecurring"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="flex items-center">
                    <RepeatIcon className="h-4 w-4 mr-1" />
                    Make this a recurring task
                  </FormLabel>
                  <FormDescription>
                    This task will automatically recreate itself after completion
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {watchIsRecurring && (
            <FormField
              control={form.control}
              name="recurringInterval"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat every</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        className="w-16"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value) || 1)}
                      />
                    </FormControl>
                    <span className="text-sm text-muted-foreground">
                      {form.watch("recurrence") === "daily" && "days"}
                      {form.watch("recurrence") === "weekly" && "weeks"}
                      {form.watch("recurrence") === "monthly" && "months"}
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};
