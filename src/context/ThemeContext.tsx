import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeKey, ThemeColors, getTheme } from '../theme/colors';

interface ThemeContextType {
  themeKey: ThemeKey;
  isDark: boolean;
  colors: ThemeColors;
  setThemeKey: (key: ThemeKey) => void;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeKey, setThemeKey] = useState<ThemeKey>('sage');
  const [isDark, setIsDark] = useState(systemScheme === 'dark');

  useEffect(() => {
    if (themeKey !== 'dark') setIsDark(systemScheme === 'dark');
  }, [systemScheme, themeKey]);

  const colors = getTheme(themeKey, themeKey === 'dark' ? true : isDark);

  const toggleDark = () => {
    if (themeKey !== 'dark') setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ themeKey, isDark, colors, setThemeKey, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
