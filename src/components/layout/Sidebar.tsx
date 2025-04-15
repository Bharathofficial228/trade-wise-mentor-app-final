
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LineChart, 
  BookOpen, 
  Calendar, 
  Plus, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  Trophy,
  BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 flex items-center justify-between h-16">
          {!collapsed && (
            <h1 className="text-xl font-bold text-sidebar-foreground">Hey Trader</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <NavItems collapsed={collapsed} />
        </nav>

        {/* New Trade Button */}
        <div className="p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className={cn(
                  "w-full bg-sidebar-primary hover:bg-primary/90 text-primary-foreground font-medium",
                  collapsed ? "px-2" : ""
                )}>
                  <Plus className="mr-2" size={18} />
                  {!collapsed && "New Trade"}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">New Trade</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  );
};

interface NavItemsProps {
  collapsed: boolean;
}

const NavItems = ({ collapsed }: NavItemsProps) => {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: Home },
    { path: "/trades", label: "Trades", icon: LineChart },
    { path: "/playbooks", label: "Playbooks", icon: BookOpen },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/achievements", label: "Achievements", icon: Trophy },
    { path: "/stats", label: "Statistics", icon: BarChart2 },
    { path: "/settings", label: "Settings", icon: Settings }
  ];

  return (
    <ul className="space-y-2 px-3">
      {navItems.map((item) => (
        <li key={item.path}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-2 px-3 rounded-md transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                      collapsed ? "justify-center" : ""
                    )
                  }
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
