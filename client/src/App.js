import React, { useState } from "react";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import Itinerary from './Itinerary';
import { addItem, replaceItem, reorderOrMove, removeItem, removeList } from './listUtils';


let id = 0;

function App() {

  const [attractions, setAttractions] = useState([[]]);
  const [startDate, setStartDate] = useState(new Date());

  function onAddItem(i, attraction) {
    id += 1;
    const newAttractions = addItem(attractions, i, { id: `${id}`, title: attraction });
    setAttractions(newAttractions)
  }

  return (
    <div style={{ padding: "20px" }}>
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
      <Itinerary
        items={attractions}
        startDate={startDate}
        onMoveItem={(result) => setAttractions(reorderOrMove(result, attractions))}
        onAddItem={onAddItem}
        onEditItem={(i, index, item) => setAttractions(replaceItem(attractions, i, index, item))}
        onRemoveItem={(i, index) => setAttractions(removeItem(attractions, i, index))}
        onRemoveList={(i, index) => setAttractions(removeList(attractions, i, index))}
      />
      <Button
        variant="contained"
        onClick={() => {
          setAttractions([...attractions, []]);
        }}
      >
        Add Day
      </Button>
    </div >
  );
}

export default App;
