
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { TaskCard } from '@/components/TaskCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Coins, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const Dashboard = () => {
  const { tasks, currency, deleteTask, getUpcomingTasks, getDailyTasks, getWeeklyTasks, getMonthlyTasks } = useAccountability();
  const navigate = useNavigate();

  const upcomingTasks = getUpcomingTasks();
  const dailyTasks = getDailyTasks();
  const weeklyTasks = getWeeklyTasks();
  const monthlyTasks = getMonthlyTasks();

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-lg font-medium">
            <Coins className="h-5 w-5 text-currency mr-1" />
            <span>{currency}</span>
          </div>
          <Button onClick={() => navigate("/add")}>
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <Card className="bg-muted/50">
          <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px] text-center">
            <h3 className="text-xl font-medium mb-2">Welcome to AccountaPal!</h3>
            <p className="text-muted-foreground mb-4">Let's start tracking your progress by adding your first task.</p>
            <Button onClick={() => navigate("/add")}>
              <Plus className="h-4 w-4 mr-1" />
              Create your first task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={(id) => (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the task.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  />
                ))
              ) : (
                <Card className="col-span-full bg-muted/50">
                  <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                    <p className="text-muted-foreground">No upcoming tasks. You're all caught up!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="daily" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dailyTasks.length > 0 ? (
                dailyTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <Card className="col-span-full bg-muted/50">
                  <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                    <p className="text-muted-foreground">No daily tasks. Add some to get started!</p>
                    <Button onClick={() => navigate("/add")} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Daily Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyTasks.length > 0 ? (
                weeklyTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <Card className="col-span-full bg-muted/50">
                  <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                    <p className="text-muted-foreground">No weekly tasks. Add some to track weekly goals!</p>
                    <Button onClick={() => navigate("/add")} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Weekly Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyTasks.length > 0 ? (
                monthlyTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <Card className="col-span-full bg-muted/50">
                  <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[200px] text-center">
                    <p className="text-muted-foreground">No monthly tasks. Add some for long-term goals!</p>
                    <Button onClick={() => navigate("/add")} variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Monthly Task
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Dashboard;
