import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import List from '../List';
import { Button, TextInput, Paper, Text, Slider, Grid } from '@mantine/core';
import './styles.scss';
import { SettingsContext } from '../../Context/Settings';
import SettingsForm from '../SettingsForm';
import Auth from '../Auth/auth';

const Todo = () => {
  const [settings] = useContext(SettingsContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <Grid >
      <Grid.Col span={6}>
        <div className="todo-app">
          <Paper padding="md" className="todo-header" data-testid="todo-header">
            <Text align="center" size="xl">
              To Do List: {incomplete} items pending
            </Text>
          </Paper>

          <div>
            <h2>Current Settings:</h2>
            <ul>
              <li>Show Completed ToDos: {settings.hideCompleted ? 'Yes' : 'No'}</li>
              <li>Items per page: {settings.itemsToShow}</li>
            </ul>
          </div>
          <Auth capability="create">
          <form onSubmit={handleSubmit}>
            <Paper padding="md" className="todo-form">
              <Text size="lg">Add To Do Item</Text>

              <div className="input-group">
                <TextInput label="To Do Item" placeholder="Item Details" onChange={handleChange} name="text" />
              </div>

              <div className="input-group">
                <TextInput label="Assigned To" placeholder="Assignee Name" onChange={handleChange} name="assignee" />
              </div>

              <div className="input-group">
                <Text>Difficulty</Text>
                <Slider onChange={handleChange} defaultValue={defaultValues.difficulty} min={1} max={5} name="difficulty" />
              </div>

              <Button type="submit" fullWidth>
                Add Item
              </Button>
            </Paper>
          </form>
          </Auth>
        </div>
        <SettingsForm />
      </Grid.Col>

      <Grid.Col span={6}>
        <List list={list} setList={setList} />
      </Grid.Col>
    </Grid>
  );
};

export default Todo;
