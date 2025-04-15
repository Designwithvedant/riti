
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const clearAllData = () => {
    localStorage.removeItem('accountability_tasks');
    localStorage.removeItem('accountability_currency');
    
    toast({
      title: "Data Cleared",
      description: "All your tasks and currency have been reset.",
    });
    
    // Force a page reload to update the context state
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>About Riti</CardTitle>
          <CardDescription>
            Your personal accountability partner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Riti helps you stay accountable by tracking your tasks and requiring proof of completion.
            Complete tasks to earn virtual currency!
          </p>
          <p>
            Your data is stored locally in your browser.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Destructive actions that cannot be undone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Reset All Data</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your tasks and reset your currency balance to zero.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAllData}>
                  Yes, delete everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
