import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { SettingsProvider, SettingsContext } from './index';

const TestComponent = () => {
  const contextValue = useContext(SettingsContext);

  return <span data-testid="context-value">{JSON.stringify(contextValue)}</span>;
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
      sortWord: 'difficulty',
    };

    expect(JSON.parse(spanElement.textContent)).toEqual(expectedValue);
  });
});
