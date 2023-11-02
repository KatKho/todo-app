import React from 'react';
import Todo from './Components/Todo';
// import Login from './Components/Login/login';
import Header from './Components/Header';
import '@mantine/core/styles.css';
import { SettingsProvider } from './Context/Settings';
import { MantineProvider} from '@mantine/core';
import  LoginProvider  from './Context/Auth/context'; 
import Auth from './Components/Auth/auth';

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <LoginProvider>
          <MantineProvider>
            <Header />
            {/* <Login /> */}
              <Auth>
                <Todo />
              </Auth>
          </MantineProvider>
        </LoginProvider>
      </SettingsProvider>
    );
  }
}
