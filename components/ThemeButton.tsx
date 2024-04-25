'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeButton() {
  const { setTheme } = useTheme();
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    if (!dark) {
      setTheme('light');
      setDark(true);
    } else {
      setTheme('dark');
      setDark(false);
    }
  };
  return (
    <div
      className="w-10 h-10 flex items-center justify-center cursor-pointer"
      onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </div>
  );
}
