import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { format } from 'date-fns';
import add from 'date-fns/add'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

import Item, { ModifyItemInterface } from './Item'

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
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {provided =>
                  <Item
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    item={item}
                    index={index}

                    listIndex={listIndex}
                    onRemoveItem={props.onRemoveItem}
                    onEditItem={props.onEditItem}
                  />}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </CardContent>
  </Card>
}

function getTitle(startDate: Date | string | null, i: number) {
  if (!startDate) {
    return `Day ${i + 1}`;
  }
  if (typeof startDate === 'string') {
    startDate = new Date(startDate)
  }
  const day = add(startDate, { days: i })
  return format(day, 'E, MMM d')
}

export default ItemList;