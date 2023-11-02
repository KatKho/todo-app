import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Paper, Button } from '@mantine/core';
import './styles.scss';
import Auth from '../Auth/auth';

const List = ({ list, setList }) => {
  const [settings] = useContext(SettingsContext);

  const toggleComplete = (id) => {
    const items = list.map( item => {
      if ( item.id === id ) {
        return { ...item, complete: !item.complete };
      }
      return item;
    });
    setList(items);
  };

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  const filteredList = settings.hideCompleted ? list : list.filter(item => !item.complete);

  const itemsPerPage = settings.itemsToShow;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const displayedItems = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// console.log("Current Page:", currentPage);
// console.log("Total Pages:", totalPages);
// console.log("Displayed Items:", displayedItems);

  return (
    <>
    <Auth capibility='read'>
      {displayedItems.map(item => (
            <Paper shadow='lg' radius='lg' p='xl' key={item.id} className="list">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <Auth capability='update'>
              <Button 
                onClick={() => toggleComplete(item.id)}
                color={item.complete ? 'red' : 'green'}
              >
                {item.complete ? 'Completed' : 'Pending'}
              </Button>
              </Auth>
              <Auth capability='delete'>
              <Button
              onClick={() => deleteItem(item.id)}
              color='red'
              style={{ marginLeft: '10px' }}
              >
                x
              </Button>
            </Auth>
            </div>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <hr />
            </Paper>
          ))}

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          size="md"
          total={totalPages}
          current={currentPage}
          onChange={setCurrentPage}
        />
        </div>
      )}
      </Auth>
    </>
  );
};

export default List;
