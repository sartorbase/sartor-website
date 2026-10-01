import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'champagne' | 'black';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('champagne');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sartor-atelier-theme') as Theme;
      if (saved === 'black' || saved === 'champagne') {
        setThemeState(saved);
        applyTheme(saved);
      } else {
        applyTheme('champagne');
      }
    } catch {
      applyTheme('champagne');
    }
  }, []);

  const applyTheme = (t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.classList.remove('theme-black', 'theme-champagne');
    document.documentElement.classList.add(`theme-${t}`);
    document.documentElement.style.colorScheme = t === 'black' ? 'dark' : 'light';
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('sartor-atelier-theme', newTheme);
    } catch {}
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'black' ? 'champagne' : 'black';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'champagne' as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
};
