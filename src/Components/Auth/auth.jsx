import React, { useContext } from 'react';
import { When } from 'react-if';

import { LoginContext } from '../../Context/Auth/context';

const Login = ({ children, capability }) => {
  const context = useContext(LoginContext);
  const isLoggedIn = context.loggedIn;
  const canDo = capability ? context.can(capability) : true;
  const okToRender = isLoggedIn && canDo;
  console.log('AUTH COMPONENT CONTEXT', context);
  return (
    <When condition={okToRender}>
      {children}
    </When>
  );
};

export default Login;