import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Container, Text, Paper, Input, Checkbox, Button } from '@mantine/core';

function SettingsForm() {
  const [settings, setSettings] = useContext(SettingsContext);
  const [formValues, setFormValues] = useState(settings);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formValues);
  };

  return (
    <Container align="left" size={600}>
    <Paper>
      <Text align="left" size="xl">Update Settings:</Text>
      <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px',  marginTop: '15px', }}>
        <Checkbox 
          label="Show Completed ToDos:"
          name="hideCompleted"
          checked={formValues.hideCompleted}
          onChange={(e) => handleInputChange({
            target: {
              name: e.currentTarget.name,
              type: 'checkbox',
              checked: e.currentTarget.checked
            }
          })}
        />
        </div>
        <div style={{ marginBottom: '15px' }}>
        <Text align="left">Items per page:</Text>
        <Input 
          type="number"
          label="Items per page:"
          name="itemsToShow"
          value={String(formValues.itemsToShow)}
          onChange={(e) => handleInputChange({
            target: {
              name: e.currentTarget.name,
              type: 'number',
              value: e.currentTarget.value
            }
          })}
        />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </Paper>
    </Container>
  );
}

export default SettingsForm;