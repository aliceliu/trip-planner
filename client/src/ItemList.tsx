import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import Item, { ModifyItemInterface } from './Item'

function getTitle(startDate: Date | null, i: number) {
  if (!startDate) {
    return `Day ${i + 1}`;
  }
  const day = new Date();
  day.setDate(startDate.getDate() + i);
  return day.toLocaleDateString('en-us', { weekday: "short", month: "short", day: "numeric" })
}

export interface ModifyListInterface {
  onAddItem: (listIndex: number, newItem: any) => void,
  onRemoveList: (listIndex: number) => void,
}

interface ItemListInterface extends ModifyItemInterface, ModifyListInterface {
  items: any[],
  startDate: Date | null,
  listIndex: number,
}

function ItemList(props: ItemListInterface) {
  const { listIndex } = props;
  const [newItem, setNewItem] = useState("");

  function onSubmit(event: any) {
    if (newItem) {
      props.onAddItem(listIndex, newItem);
      setNewItem("");
    }
    event.preventDefault();
  }

  return <Card variant="outlined">
    <CardHeader title={getTitle(props.startDate, listIndex)} action={
      <IconButton aria-label="close" onClick={() => {
        props.onRemoveList(listIndex);
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
            {props.items.map((item: any, index: number) => (
              <Item
                item={item}
                index={index}
                key={item.id}
                listIndex={listIndex}
                onRemoveItem={props.onRemoveItem}
                onEditItem={props.onEditItem}
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