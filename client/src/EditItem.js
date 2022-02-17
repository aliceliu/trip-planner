import React, { useState } from "react";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


function EditItem({ onClose, open, onConfirm, item, index, listIndex }) {

  const [newItem, setNewItem] = useState({ ...item });

  function updateItem(value, field) {
    if (value) {
      const updatedItem = { ...item }
      updatedItem[field] = value;
      setNewItem(updatedItem);
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
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
            onClick={(event) => onConfirm(event, index, listIndex, newItem)}
          >
            Confirm
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default EditItem;