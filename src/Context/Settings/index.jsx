import React, { createContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const validateLocalStorage = (localData, defaultSettings) => {
  if (!localData) return defaultSettings;
  
  const parsedData = JSON.parse(localData);
  parsedData.itemsToShow = parseInt(parsedData.itemsToShow, 10);

  if (
    typeof parsedData.itemsToShow === "number" &&
    typeof parsedData.hideCompleted === "boolean"
  ) {
    return parsedData;
  }

  return defaultSettings;
};

const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    itemsToShow: 3,
    hideCompleted: true
  };

  const [settingsInitialized, setSettingsInitialized] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const localData = localStorage.getItem("appSettings");
    const validatedSettings = validateLocalStorage(localData, defaultSettings);
    setSettings(validatedSettings);
    setSettingsInitialized(true);
  }, []);

  useEffect(() => {
    if (settingsInitialized) {
      localStorage.setItem("appSettings", JSON.stringify(settings));
    }
  }, [settings, settingsInitialized]);

  if (!settingsInitialized) return null;

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {children}
    </SettingsContext.Provider>
  );
};


export { SettingsContext, SettingsProvider };
