import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

import Grid from '@mui/material/Grid';

import ItemList, { ModifyListInterface } from './ItemList'
import { ModifyItemInterface } from './Item'

interface ItineraryInterface extends ModifyItemInterface, ModifyListInterface {
  items: any[],
  startDate: Date,
  onMoveItem: OnDragEndResponder,
}

function Itinerary(props: ItineraryInterface) {
  return (
    <Grid container spacing={2}>
      <DragDropContext onDragEnd={props.onMoveItem}>
        {props.items.map((items: any[], i: number) => (
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
