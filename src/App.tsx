import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Playbooks from "./pages/Playbooks";
import Calendar from "./pages/Calendar";
import Achievements from "./pages/Achievements";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import TradeForm from "./pages/TradeForm";
import { TradeProvider } from "./contexts/TradeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TradeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/trades" element={<MainLayout><Trades /></MainLayout>} />
            <Route path="/trades/new" element={<MainLayout><TradeForm /></MainLayout>} />
            <Route path="/trades/:id" element={<MainLayout><TradeForm /></MainLayout>} />
            <Route path="/playbooks" element={<MainLayout><Playbooks /></MainLayout>} />
            <Route path="/calendar" element={<MainLayout><Calendar /></MainLayout>} />
            <Route path="/achievements" element={<MainLayout><Achievements /></MainLayout>} />
            <Route path="/stats" element={<MainLayout><Statistics /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </TradeProvider>
  </QueryClientProvider>
);

export default App;
