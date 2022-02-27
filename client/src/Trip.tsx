import { useEffect, useState } from "react";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { useParams, useNavigate } from "react-router-dom";
import uuid from 'react-uuid'
import { doc, addDoc, collection, getDoc, setDoc, writeBatch } from "firebase/firestore";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';

import Itinerary from './Itinerary';
import { addItem, replaceItem, reorderOrMove, removeItem, removeList } from './utils/listModifier';
import { db, User } from './firebase';

function Trip(props: { user: User | null, showLogin: () => void }) {

  const navigate = useNavigate();
  const uid = props.user?.uid;
  const params = useParams();
  const id = params["*"]

  const [name, setName] = useState<string>('');
  const [attractions, setAttractions] = useState<any[][]>([[]]);
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    if (id) {
      getDoc(doc(db, 'trips', id))
        .then(function (response) {
          const data = response.data();
          if (data) {
            setName(data.name ?? '');
            setStartDate(data.start_timestamp && new Date(data.start_timestamp));
            setAttractions(JSON.parse(data.attractions));
          }
        })
        .catch(console.error);
    } else {
      setName('');
      setAttractions([[]]);
      setStartDate(null);
    }
  }, [id]);

  function onAddItem(i: number, attraction: any) {
    const newAttractions = addItem(attractions, i, { id: uuid(), title: attraction });
    setAttractions(newAttractions)
  }

  async function onSave() {
    if (!uid) {
      props.showLogin();
      return;
    }
    const data: { [key: string]: any } = { 'attractions': JSON.stringify(attractions) };
    if (name) {
      data['name'] = name;
    }
    const startTimestamp = startDate && startDate.getTime();
    data['start_timestamp'] = startDate && startDate.getTime();
    data['creator_id'] = uid;

    const tripMetadata = { 'name': name, 'start_timestamp': startTimestamp, 'days': attractions.length };
    if (id) {
      const batch = writeBatch(db);
      batch.update(doc(db, 'trips', id), data);
      batch.set(doc(db, `users/${uid ?? ''}/trips/`, id), tripMetadata);
      await batch.commit();
    } else {
      const trip = await addDoc(collection(db, 'trips'), data);
      await setDoc(doc(db, `users/${uid ?? ''}/trips/`, trip.id), tripMetadata);
      navigate(`/trip/${trip.id}`)
    }
  }

  async function onDelete() {
    if (id) {
      const batch = writeBatch(db);
      batch.delete(doc(db, `users/${uid ?? ''}/trips/`, id));
      batch.delete(doc(db, 'trips', id))
      await batch.commit();
      navigate(`/`);
    }
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
      >
        {<Button onClick={onSave}>Save</Button>}
        {id && <Button onClick={onDelete}>Delete</Button>}
      </Stack>
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
