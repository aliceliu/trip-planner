import { useState } from "react";

import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


import './App.css';

import Itinerary from './Itinerary';
import { addItem, replaceItem, reorderOrMove, removeItem, removeList } from './listUtils';


let id = 0;

function App() {

  const [attractions, setAttractions] = useState<any[][]>([[]]);
  const [startDate, setStartDate] = useState(null);

  function onAddItem(i: number, attraction: any) {
    id += 1;
    const newAttractions = addItem(attractions, i, { id: `${id}`, title: attraction });
    setAttractions(newAttractions)
  }

  return (
    <Stack p={"2em"}>
      <Box mb={"1em"}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Itinerary
        items={attractions}
        startDate={startDate}
        onAddDay={() =>
          setAttractions([...attractions, []])
        }
        onMoveItem={(result: DropResult, provided: ResponderProvided) => setAttractions(reorderOrMove(result, attractions))}
        onAddItem={onAddItem}
        onEditItem={(listIndex: number, index: number, item: any) => setAttractions(replaceItem(attractions, listIndex, index, item))}
        onRemoveItem={(listIndex: number, index: number) => setAttractions(removeItem(attractions, listIndex, index))}
        onRemoveList={(listIndex: number) => setAttractions(removeList(attractions, listIndex))}
      />
    </Stack >
  );
}

export default App;
