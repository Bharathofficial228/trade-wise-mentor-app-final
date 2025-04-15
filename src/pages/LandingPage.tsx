
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LineChart, ArrowRight, BarChart2, BookOpen, Calendar, Trophy } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Header/Navigation */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LineChart className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">HEY TRADER</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sidebar-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sidebar-foreground/80 hover:text-primary transition-colors">How it works</a>
          <a href="#pricing" className="text-sidebar-foreground/80 hover:text-primary transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate("/dashboard")}
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 md:py-20 relative overflow-hidden">
        {/* Green glowing effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] translate-x-1/3"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-primary">JOURNAL.</span> <span className="text-primary">LEARN.</span> <span className="text-primary">PROFIT.</span>
          </h1>
          <p className="text-lg md:text-xl text-sidebar-foreground/80 mb-12 max-w-3xl mx-auto">
            Unlock your trading potential with Hey Trader. Discover patterns, correct mistakes,
            and elevate both your trading and your life.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            onClick={() => navigate("/dashboard")}
          >
            Sign Up
          </Button>
        </div>
      </section>

      {/* Features Preview */}
      <section className="w-full px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats card */}
        <div className="bg-background/10 backdrop-blur-sm border border-sidebar-border rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-primary mb-2">4.9</div>
          <div className="w-full h-2 bg-background/20 rounded-full overflow-hidden">
            <div className="h-full w-[98%] bg-primary rounded-full"></div>
          </div>
          <p className="mt-4 text-sidebar-foreground/70 text-sm">Average User Rating</p>
        </div>

        {/* Score card */}
        <div className="bg-background/10 backdrop-blur-sm border border-sidebar-border rounded-lg p-6 flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="8"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset="70"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">75</span>
            </div>
          </div>
          <p className="ml-4 text-sidebar-foreground/70">Trading Score</p>
        </div>

        {/* Stats summary */}
        <div className="bg-background/10 backdrop-blur-sm border border-sidebar-border rounded-lg p-6">
          <div className="flex items-center text-profit mb-4">
            <div className="flex items-center bg-profit/10 text-profit rounded-md px-2 py-1">
              <ArrowRight className="h-4 w-4 mr-1 rotate-45" />
              <span className="font-semibold">+$2,565</span>
            </div>
            <span className="ml-auto text-sidebar-foreground/70 text-sm">11/20/23</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex justify-between">
              <span className="text-sidebar-foreground/70">Total</span>
              <span>3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sidebar-foreground/70">Win rate</span>
              <span>67%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sidebar-foreground/70">Winners</span>
              <span>2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sidebar-foreground/70">Losers</span>
              <span>1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full px-6 md:px-12 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={LineChart} 
            title="Trade Journaling" 
            description="Track your trades, emotions, and performance metrics in one place."
          />
          <FeatureCard 
            icon={BookOpen} 
            title="Playbook Builder" 
            description="Create and manage your trading strategies with detailed checklists."
          />
          <FeatureCard 
            icon={Calendar} 
            title="Performance Calendar" 
            description="Visualize your trading activity and results over time."
          />
          <FeatureCard 
            icon={Trophy} 
            title="Achievements" 
            description="Earn badges and track your progress with gamification elements."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-8 border-t border-sidebar-border">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <LineChart className="h-6 w-6 text-primary" />
            <span className="font-bold">HEY TRADER</span>
          </div>
          <div className="text-sm text-sidebar-foreground/60">
            © 2025 Hey Trader. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-background/10 backdrop-blur-sm border border-sidebar-border rounded-lg p-6">
      <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sidebar-foreground/70">{description}</p>
    </div>
  );
};

export default LandingPage;
