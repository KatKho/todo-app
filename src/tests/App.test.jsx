window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {}
    };
};

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../App';

describe('App Integration Tests', () => {
  it('renders all components', () => {
    render(<App />);
    expect(screen.getByTestId('todo-header')).toBeDefined();
  });
});

