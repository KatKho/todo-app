import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Paper, Button } from '@mantine/core';
import './styles.scss';

const List = ({ list, setList }) => {
  const settings = useContext(SettingsContext);

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

  const filteredList = settings.hideCompleted ? list.filter(item => !item.complete) : list;

  const itemsPerPage = settings.itemsToShow;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const displayedItems = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  console.log("Current Page:", currentPage);
console.log("Total Pages:", totalPages);
console.log("Displayed Items:", displayedItems);

  return (
    <>
      {displayedItems.map(item => (
            <Paper shadow='lg' radius='lg' p='xl' key={item.id} className="list">
              <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <hr />
            </Paper>
          ))}

      {totalPages > 1 && (
        <Pagination
          size="md"
          total={totalPages}
          current={currentPage}
          onChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default List;
