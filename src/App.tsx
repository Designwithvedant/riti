
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountabilityProvider } from "./contexts/AccountabilityContext";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Index";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import CompleteTask from "./pages/CompleteTask";
import CompletedTasks from "./pages/CompletedTasks";
import TasksByType from "./pages/TasksByType";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccountabilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/edit/:id" element={<EditTask />} />
              <Route path="/complete/:id" element={<CompleteTask />} />
              <Route path="/completed" element={<CompletedTasks />} />
              <Route path="/tasks/:type" element={<TasksByType />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AccountabilityProvider>
  </QueryClientProvider>
);

export default App;
