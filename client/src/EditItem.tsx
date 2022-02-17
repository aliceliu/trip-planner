import { useState } from "react";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

interface EditItemInterface {
  open: boolean,
  listIndex: number,
  index: number,
  item: any,
  onConfirm: (listIndex: number, index: number, newItem: any) => void,
  onClose: () => void,
}

function EditItem(props: EditItemInterface) {

  const { item } = props;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [startTime, setStartTime] = useState(item.startTime);
  const [endTime, setEndTime] = useState(item.endTime);

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Edit Activity</DialogTitle>
      <DialogContent style={{ padding: "2em" }}>
        <Stack spacing={2}>
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></TextField>
          <TextField
            multiline
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}></TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(startTime) => setStartTime(startTime)}
              clearable={true}
              minutesStep={5}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(endTime) => setEndTime(endTime)}
              clearable={true}
              minutesStep={5}
              disabled={!startTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={() => props.onConfirm(props.index, props.listIndex, {
              ...item,
              'title': title,
              'description': description,
              'startTime': startTime,
              'endTime': endTime
            })}
          >
            Confirm
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default EditItem;