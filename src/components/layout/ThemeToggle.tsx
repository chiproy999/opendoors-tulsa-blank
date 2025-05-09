
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-center p-2 bg-background/80 backdrop-blur-sm border border-border rounded-full shadow-md">
      <div className="flex items-center gap-2">
        <Sun className={`h-4 w-4 ${!isDarkMode ? "text-tulsa-orange" : "text-muted-foreground"}`} />
        <span className={`text-xs font-medium ${!isDarkMode ? "text-tulsa-orange" : "text-muted-foreground"}`}>Day</span>
        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <span className={`text-xs font-medium ${isDarkMode ? "text-blue-300" : "text-muted-foreground"}`}>Dark</span>
        <Moon className={`h-4 w-4 ${isDarkMode ? "text-blue-300" : "text-muted-foreground"}`} />
      </div>
    </div>
  );
};

export default ThemeToggle;
