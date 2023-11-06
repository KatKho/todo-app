window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {}
    };
};

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('App Integration Tests', () => {


  it('renders Login button', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });


// it('renders Todo component inside Auth', async () => {
//     render(<App />);
    
//     const usernameInput = screen.getByPlaceholderText('Username');
//     const passwordInput = screen.getByPlaceholderText('Password');
//     const loginButton = screen.getByText('Login');

//     fireEvent.change(usernameInput, { target: { value: 'Administrator' } });
//     fireEvent.change(passwordInput, { target: { value: 'admin' } });
//     fireEvent.click(loginButton);

//     await waitFor(() => {
//       expect(screen.getByTestId('todo-header')).toBeInTheDocument();
//     });
//   });


});
