window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {}
    };
};

import { render, fireEvent, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import cookie from 'react-cookies';
import LoginProvider from './context';
import Login from '../../Components/Login/login';
import { MantineProvider} from '@mantine/core';
import { jwtDecode } from 'jwt-decode';

// Mocks
vi.mock('axios');
vi.mock('react-cookies');
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(() => ({
    name: 'testuser',
    capabilities: ['read', 'write'], 
  })),
}));

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001'

describe('Login component', () => {
    beforeEach(() => {
        render(
          <MantineProvider>
            <LoginProvider>
              <Login />
            </LoginProvider>
          </MantineProvider>
        );
        axios.post.mockClear();
        cookie.save.mockClear();
        cookie.load.mockClear();
      });

  it('should render login form', () => {
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should handle successful login and update UI', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const token = 'fakeToken';
    const encodedCredentials = btoa(`${username}:${password}`);
  
    // Mock axios post call to match the actual login function
    axios.mockResolvedValue({ data: { token } });
  
    // Mock the jwtDecode function to return expected user data
    jwtDecode.mockReturnValue({
      name: 'testuser',
      capabilities: ['read', 'write'],
    });
  
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: username },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: password },
    });
  
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });
  
    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      url: `${SERVER_URL}/signin`, 
      headers: { Authorization: `Basic ${encodedCredentials}` },
    });
  
    // Check if the log out button is now present
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  
    // Check if the cookie was saved with the token
    cookie.save.mockImplementation((key, value, options) => {
        console.log(`save called with key: ${key}, value: ${value}, options:`, options);
      });
      expect(cookie.save).toHaveBeenCalled();
  });
  

});