import { useEffect, useState } from "react";
import axios from 'axios';
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useParams, useNavigate } from "react-router-dom";
import uuid from 'react-uuid'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import Itinerary from './Itinerary';
import { addItem, replaceItem, reorderOrMove, removeItem, removeList } from './listUtils';

function Trip() {

  const navigate = useNavigate();
  const params = useParams();

  const [attractions, setAttractions] = useState<any[][]>([[]]);
  const [startDate, setStartDate] = useState<Date | null>(null);

  function onAddItem(i: number, attraction: any) {
    const newAttractions = addItem(attractions, i, { id: uuid(), title: attraction });
    setAttractions(newAttractions)
  }

  function onSave() {
    const id = params["*"]
    const data: { [key: string]: any } = { 'attractions': attractions };
    if (startDate) {
      let startTimestamp = startDate;
      if (typeof startDate == 'string') {
        startTimestamp = new Date(startDate)
      }
      data['start_timestamp'] = startTimestamp.getTime() / 1000;
    }
    axios.post(`/trips/${id}`, data)
      .then(function (response) {
        if (!id) {
          navigate(`/trip/${response.data.id}`)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  useEffect(() => {
    const id = params["*"]
    if (id) {
      axios.get(`/trips/${id}`)
        .then(function (response) {
          setStartDate(response.data.start_timestamp)
          setAttractions(response.data.attractions)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, []);

  return (
    <>
      <Button onClick={onSave}>Save</Button>
      <Stack p={"2em"}>
        <Box mb={"1em"}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
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
      </Stack>
    </>
  );
}

export default Trip;
