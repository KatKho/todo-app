import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { SettingsProvider, SettingsContext } from './index';

const TestComponent = () => {
  const [settings, setSettings] = useContext(SettingsContext);

  const handleClick = () => {
    setSettings({
      itemsToShow: 5,
      hideCompleted: false,
    });
  };

  return (
    <div>
      <span data-testid="context-value">{JSON.stringify(settings)}</span>
      <button data-testid="update-button" onClick={handleClick}>Update Settings</button>
    </div>
  );
};

describe('SettingsProvider Tests', () => {
  it('provides the correct default settings', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    const spanElement = screen.getByTestId('context-value');
    const expectedValue = {
      itemsToShow: 3,
      hideCompleted: true,
    };

    expect(JSON.parse(spanElement.textContent)).toEqual(expectedValue);
  });

  // Test if the TestComponent renders correctly
describe('TestComponent Rendering', () => {
  it('renders correctly within SettingsProvider', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    const spanElement = screen.getByTestId('context-value');
    expect(spanElement).toHaveTextContent(JSON.stringify({
      itemsToShow: 3,
      hideCompleted: true,
    }));
  });
});

// Test updating context value
describe('SettingsContext Value Update', () => {
  it('updates the context value correctly', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    // Initial check
    const spanElement = screen.getByTestId('context-value');
    expect(spanElement).toHaveTextContent(JSON.stringify({
      itemsToShow: 3,
      hideCompleted: true,
    }));

    // Click to update settings
    const button = screen.getByTestId('update-button');
    fireEvent.click(button);

    expect(spanElement).toHaveTextContent(JSON.stringify({
      itemsToShow: 5,
      hideCompleted: false,
    }));
  });
});

});

