import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage or prefers dark mode
  const [darkMode, setDarkMode] = useState(() => {
    // Check for theme in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // If no theme in localStorage, check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Update the HTML class and localStorage when darkMode changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    console.log('Theme changed:', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    console.log('Toggle dark mode, current:', darkMode);
    setDarkMode(prev => !prev);
  };

  const value = {
    darkMode,
    toggleDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
