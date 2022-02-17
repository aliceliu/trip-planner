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

  const [newItem, setNewItem] = useState({ ...props.item });

  function updateItem(value: any, field: string) {
    if (value) {
      const updatedItem = { ...props.item }
      updatedItem[field] = value;
      setNewItem(updatedItem);
    }
  }

  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Edit Activity</DialogTitle>
      <DialogContent style={{ padding: "2em" }}>
        <Stack spacing={2}>
          <TextField
            autoFocus required
            label="Title"
            value={newItem && newItem.title}
            onChange={(event) => updateItem(event.target.value, 'title')}
          ></TextField>
          <TextField
            multiline
            label="Description"
            value={newItem && newItem.description}
            onChange={(event) => updateItem(event.target.value, 'description')}></TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              value={newItem && newItem.startTime}
              onChange={(date) => updateItem(date, 'startTime')}
              clearable={true}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End Time"
              value={newItem && newItem.endTime}
              onChange={(date) => updateItem(date, 'endTime')}
              clearable={true}
              disabled={!newItem.startTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={() => props.onConfirm(props.index, props.listIndex, newItem)}
          >
            Confirm
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default EditItem;