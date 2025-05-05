import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    const savedColor = localStorage.getItem('primaryColor');
    return savedColor || '#1976d2';
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const changeColor = (color) => {
    setPrimaryColor(color);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    localStorage.setItem('primaryColor', primaryColor);
  }, [isDarkMode, primaryColor]);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: primaryColor,
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, primaryColor, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};