import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  BookOpen,
  Calendar as CalendarIcon,
  Award,
  Settings as SettingsIcon,
  Menu,
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { path: '/', icon: <LayoutDashboard />, label: 'Dashboard' },
    { path: '/trades', icon: <LineChart />, label: 'Trades' },
    { path: '/playbooks', icon: <BookOpen />, label: 'Playbooks' },
    { path: '/calendar', icon: <CalendarIcon />, label: 'Calendar' },
    { path: '/achievements', icon: <Award />, label: 'Achievements' },
    { path: '/settings', icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-card border-r transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          {isSidebarOpen && <h1 className="text-xl font-bold">TradeWise</h1>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-accent rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 ${
                location.pathname === item.path
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50'
              } ${isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'}`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
