import React from 'react';
import Todo from './Components/Todo';
import '@mantine/core/styles.css';
import { SettingsProvider } from './Context/Settings';
import { MantineProvider } from '@mantine/core';

export default class App extends React.Component {
  render() {
    return (
    <MantineProvider >
      <SettingsProvider>
        <Todo />
      </SettingsProvider>
    </MantineProvider>
    );
  }
}
