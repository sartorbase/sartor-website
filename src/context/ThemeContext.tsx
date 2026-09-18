import React, { createContext, useContext, useEffect, useState } from 'react';

export type AtelierTheme = 'black' | 'champagne';

export interface ThemeContextType {
  theme: AtelierTheme;
  setTheme: (theme: AtelierTheme) => void;
  toggleTheme: () => void;
  isChampagne: boolean;
}

const STORAGE_KEY = 'sartor-atelier-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AtelierTheme>(() => {
    // Check local storage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as AtelierTheme | null;
      if (savedTheme === 'black' || savedTheme === 'champagne') {
        return savedTheme;
      }
    }
    // Default to 'black' (Classic Black)
    return 'black';
  });

  const applyThemeToDOM = (activeTheme: AtelierTheme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.setAttribute('data-theme', activeTheme);
    root.classList.remove('theme-black', 'theme-champagne');
    root.classList.add(`theme-${activeTheme}`);
    root.style.colorScheme = activeTheme === 'black' ? 'dark' : 'light';
  };

  useEffect(() => {
    applyThemeToDOM(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage write failures (e.g. incognito)
    }
  }, [theme]);

  const setTheme = (newTheme: AtelierTheme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'black' ? 'champagne' : 'black'));
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    isChampagne: theme === 'champagne',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
