import { useEffect, useState } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import uuid from 'react-uuid'

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import Itinerary from './Itinerary';
import { addItem, replaceItem, reorderOrMove, removeItem, removeList } from './listUtils';

function Trip() {

  const navigate = useNavigate();
  const params = useParams();
  const id = params["*"]

  const [name, setName] = useState<string>('');
  const [attractions, setAttractions] = useState<any[][]>([[]]);
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/trips/${id}`)
        .then(function (response) {
          setName(response.data.name)
          setStartDate(response.data.start_timestamp)
          setAttractions(response.data.attractions)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }, [id]);

  function onAddItem(i: number, attraction: any) {
    const newAttractions = addItem(attractions, i, { id: uuid(), title: attraction });
    setAttractions(newAttractions)
  }

  function onSave() {
    const data: { [key: string]: any } = { 'attractions': attractions };
    if (name) {
      data['name'] = name
    }
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

  function onDelete() {
    if (id) {
      axios.delete(`/trips/${id}`)
        .then(function (response) {
          navigate(`/`)
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  return (
    <>
      <Button onClick={onSave}>Save</Button>
      {id && <Button onClick={onDelete}>Delete</Button>}
      <Stack p={4}>
        <Stack direction={'row'} mb={2} spacing={2}>
          <TextField label="Trip Name"
            value={name}
            onChange={(event) => setName(event.target.value)}></TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Stack>
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
