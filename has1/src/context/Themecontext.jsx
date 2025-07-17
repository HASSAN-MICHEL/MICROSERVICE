// src/context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [primaryColor, setPrimaryColor] = useState(
    localStorage.getItem('primaryColor') || '#4e73df'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--primary', primaryColor);
    localStorage.setItem('theme', theme);
    localStorage.setItem('primaryColor', primaryColor);
  }, [theme, primaryColor]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
};