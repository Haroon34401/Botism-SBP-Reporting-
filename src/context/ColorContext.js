import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const ColorContext = createContext();

// Create a provider component
export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('defaultColor'); // Initial color state

  useEffect(() => {
    // Simulate fetching initial color data from JSON
    fetch('./Jsondata/colorData.json')  // Ensure this path is correct
      .then((response) => response.json())
      .then((data) => {
        const defaultColor = data.find((item) => item.reportId === 'A03')?.color || 'defaultColor';
        setColor(defaultColor);
      })
      .catch((error) => console.error('Error fetching color data:', error));
  }, []);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};
