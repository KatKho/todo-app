import React, { useState, useContext } from 'react';
import { When } from 'react-if';
import { Button } from '@mantine/core';
import { LoginContext } from '../../Context/Auth/context';

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
    <>
      <When condition={context.loggedIn}>
        <Button onClick={context.logout}>Log Out</Button>
      </When>

      <When condition={!context.loggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
          />
          <input
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </When>
    </>
  );
};

export default Login;
