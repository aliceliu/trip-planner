import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import Item from './Item'

function getTitle(startDate, i) {
  const day = new Date();
  day.setDate(startDate.getDate() + i);
  return day.toLocaleDateString('en-us', { weekday: "short", month: "short", day: "numeric" })
}

function ItemList({ startDate, items, listIndex, onAddItem, onRemoveItem, onEditItem, onRemoveList }) {
  const [newItem, setNewItem] = useState("");

  function onSubmit(event) {
    if (newItem) {
      onAddItem(listIndex, newItem);
      setNewItem("");
    }
    event.preventDefault();
  }

  return <Card variant="outlined">
    <CardHeader title={getTitle(startDate, listIndex)} action={
      <IconButton aria-label="close" onClick={() => {
        onRemoveList(listIndex);
      }}>
        <CloseIcon />
      </IconButton>
    } />
    <Divider />
    <CardContent>
      <form onSubmit={onSubmit}>
        <TextField fullWidth placeholder="Add attraction" value={newItem} onChange={(event) => setNewItem(event.target.value)} />
      </form>
      <Droppable droppableId={`${listIndex}`} >
        {(provided, snapshot) => (
          <List
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Item
                item={item}
                index={index}
                key={item.id}
                listIndex={listIndex}
                onRemoveItem={onRemoveItem}
                onAddItem={onAddItem}
                onEditItem={onEditItem}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </CardContent>
  </Card>
}

export default ItemList;