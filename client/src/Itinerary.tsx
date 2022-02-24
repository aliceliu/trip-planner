import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import ItemList, { ModifyListInterface } from './ItemList'
import { ModifyItemInterface } from './Item'

interface ItineraryInterface extends ModifyItemInterface, ModifyListInterface {
  items: any[],
  startDate: Date | null,
  onMoveItem: OnDragEndResponder,
  onAddDay: () => void,
}

function Itinerary(props: ItineraryInterface) {

  return (
    <Grid container spacing={2}>
      <DragDropContext onDragEnd={props.onMoveItem}>
        {props.items.map((items: any[], i: number) => (
          <Grid item xs={12} md={6} lg={4} key={i}>
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
      <Grid item xs={12} md={6} lg={4} key='add'>
        <Button
          variant="outlined"
          onClick={props.onAddDay}
          startIcon={<AddIcon />}
        >
          Add Day
        </Button>
      </Grid>
    </Grid>
  );
}

export default Itinerary;
