import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import Grid from '@mui/material/Grid';

import ItemList from './ItemList'

function Itinerary(props) {
  return (
    <Grid container spacing={2}>
      <DragDropContext onDragEnd={props.onMoveItem}>
        {props.items.map((items, i) => (
          <Grid item xs={4} key={i}>
            <ItemList
              items={items}
              listIndex={i}
              startDate={props.startDate}
              onAddItem={props.onAddItem}
              onRemoveItem={props.onRemoveItem}
              onEditItem={props.onEditItem}
              onRemoveList={props.onRemoveList}
            />
          </Grid>
        ))}
      </DragDropContext>
    </Grid>
  );
}

export default Itinerary;
