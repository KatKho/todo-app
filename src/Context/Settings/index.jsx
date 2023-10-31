import React, { createContext, useState } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    itemsToShow: 3,
    hideCompleted: true,
    sortWord: 'difficulty',
  });

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider };
