import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import List from '../List';
import { Button, TextInput, Paper, Text, Slider } from '@mantine/core';
import './styles.scss';

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  

  return (
    <div className="todo-app">
      <Paper padding="md" className="todo-header" data-testid="todo-header"> 
        <Text align="center" size="xl" >
          To Do List: {incomplete} items pending
        </Text>
      </Paper>

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
      <List list={list} setList={setList} />
    </div>
  );
};

export default Todo;
