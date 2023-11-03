import React, { useState, useContext } from 'react';
import { When } from 'react-if';
import { Button, Input, Text } from '@mantine/core';
import { LoginContext } from '../../Context/Auth/context';
import './styles.scss';

const Login = () => {
  const [state, setState] = useState({ username: '', password: '' });
  const context = useContext(LoginContext);

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    context.login(state.username, state.password);
  };

  return (
      <header className="header">
      <nav className="nav-links">
        <a href="#">Home</a>
      </nav>
      <div className="login-container">
        
      <When condition={context.loggedIn}>
        <Text>Welcome, {context.user.name}!</Text>
        <Button onClick={context.logout}>Log Out</Button>
      </When>

      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Input
              placeholder="Username"
              name="username"
              onChange={handleChange}
              className="login-input"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="login-input"
            />
            <Button type="submit">Login</Button>
          </div>
        </form>
      </When>
      </div>
      </header>
  );
};

export default Login;
