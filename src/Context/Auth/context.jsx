import React, { useState, useEffect, createContext } from 'react';
import cookie from 'react-cookies';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:3001'

// const testUsers = {
//   Administrator: {
//     password: 'admin',
//     name: 'Administrator',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
//   },
//   Editor: {
//     password: 'editor',
//     name: 'Editor',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
//   },
//   Writer: {
//     password: 'writer',
//     name: 'Writer',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
//   },
//   User: {
//     password: 'user',
//     name: 'User',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
//   },
// };

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [state, setState] = useState({
    loggedIn: false,
    token: null,
    user: { capabilities: [] },
    error: null,
  });

  function can(capability) {
    // console.log('CAN FUNCTION STATE', state);
    return state?.user?.capabilities?.includes(capability);
  }

  async function login(username, password) {
    let encodedCredentials = btoa(`${username}:${password}`);
    try {
      const config = {
        method: 'post',
        url: `${SERVER_URL}/signin`,
        headers: { Authorization: `Basic ${encodedCredentials}` }
      };
      let response = await axios(config);
      if (response.data) {
        validateToken(response.data.token);
      }
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.error(e);
    }
  }

  // This function handles authentication using a bearer token
  // async function authWithBearerToken(token) {
  //   try {
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` }
  //     };
  //     let response = await axios.get(`${SERVER_URL}/auth`, config);
  //     validateToken(token);
  //   } catch (e) {
  //     setLoginState(false, null, {}, e);
  //     console.error('Error with Bearer Authentication:', e);
  //   }
  // }

  function logout() {
    setLoginState(false, null, {});
  }

  function validateToken(token) {
    try {
      let validUser = jwtDecode(token);
      if (validUser.capabilities && typeof validUser.capabilities === "string") {
        validUser.capabilities = validUser.capabilities.replace(/'/g, '"');
        validUser.capabilities = JSON.parse(validUser.capabilities);
      }
      setLoginState(true, token, validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }
  }

  function setLoginState(loggedIn, token, user, error) {
    cookie.save('auth', token);
    console.log("Current user's capabilities:", user.capabilities); 
    setState({ ...state, token, loggedIn, user, error: error || null });
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    if(token) {
      validateToken(token);
    }
  }, []);

  useEffect(() => {
    console.log('USER HAS BEEN UPDATED', state.user);
  }, [state.user]);
  
  console.log("THIS IS CURRENT AUTH STATE", state);
  return (
    <LoginContext.Provider value={{...state, can, login, logout}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;