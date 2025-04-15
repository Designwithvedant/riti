
import React from 'react';
import { useAccountability } from '@/contexts/AccountabilityContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Coins, 
  ListTodo, 
  Plus, 
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { currency } = useAccountability();
  const isMobile = useIsMobile();

  return (
    <>
      {/* Sidebar backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 bottom-0 lg:left-0 z-50 lg:relative lg:z-auto",
          "flex flex-col w-72 bg-white border-r shadow-sm transition-all duration-300 ease-in-out",
          isOpen ? "left-0" : "-left-72",
        )}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <img src="/riti-logo.png" alt="Riti Logo" className="h-6 w-6" />
            <h1 className="text-xl font-bold">Riti</h1>
          </div>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 text-currency" />
              <span className="font-medium">My Balance</span>
            </div>
            <span className="font-bold text-lg">{currency}</span>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="flex-1 overflow-auto py-2">
          <nav className="space-y-1 px-2">
            <SidebarLink to="/" icon={<ListTodo />} label="Dashboard" />
            <SidebarLink to="/tasks/daily" icon={<Calendar />} label="Daily Tasks" />
            <SidebarLink to="/tasks/weekly" icon={<Calendar />} label="Weekly Tasks" />
            <SidebarLink to="/tasks/monthly" icon={<Calendar />} label="Monthly Tasks" />
            <SidebarLink to="/completed" icon={<CheckCircle2 />} label="Completed" />
            <SidebarLink to="/add" icon={<Plus />} label="Add Task" highlight />
          </nav>
        </div>

        <Separator className="my-2" />

        <div className="p-4">
          <SidebarLink to="/settings" icon={<Settings />} label="Settings" />
        </div>
      </div>

      {/* Toggle button for sidebar */}
      {!isOpen && (
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-md lg:hidden"
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, highlight }) => {
  return (
    <Link 
      to={to}
      className={cn(
        "flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors",
        highlight 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "hover:bg-secondary"
      )}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};
