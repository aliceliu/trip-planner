import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import format from 'date-fns/format';


import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';


import EditItem from './EditItem';
import ItemPopover from "./ItemPopover";


function Item({ item, index, listIndex, onRemoveItem, onEditItem }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  function onMoreClicked(event) {
    setAnchorEl(event.currentTarget);
  };

  function closePopover() {
    setAnchorEl(null);
  };

  function onEditClicked() {
    setDialogOpen(true);
    closePopover();
  }

  function formatTimeRange(startDate, endDate) {
    if (!startDate) {
      return '';
    }
    const start = format(startDate, 'HH:mm');
    let end = '';
    if (endDate) {
      end = ' - ' + format(endDate, 'HH:mm');
    }
    return start + end;
  }

  function onConfirm(event, index, listIndex, newItem) {
    onEditItem(listIndex, index, newItem);
    setDialogOpen(false);
    closePopover();
    event.preventDefault();
  }

  return (
    <div>
      <Draggable draggableId={item.id} index={index}>
        {provided => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            secondaryAction={
              <div>
                <IconButton edge="end" aria-label="more" onClick={onMoreClicked}>
                  <MoreVertIcon />
                </IconButton>
                <ItemPopover
                  id={open ? 'simple-popover' : undefined}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={closePopover}
                  onEditClicked={onEditClicked}
                  onRemoveItem={() => onRemoveItem(index, listIndex)}
                />
              </div>
            }
          >
            {item.startTime &&
              <CardMedia
                component="small"
                style={{ "margin": "0 1em 0 0" }}
              >
                {formatTimeRange(item.startTime, item.endTime)}
              </CardMedia>
            }
            <ListItemText primary={item.title} secondary={item.description} />
          </ListItem>
        )
        }
      </Draggable >
      <EditItem
        open={dialogOpen}
        index={index}
        listIndex={listIndex}
        item={item}
        onClose={() => setDialogOpen(false)}
        onConfirm={onConfirm}>
      </EditItem>
    </div >
  );
}

export default Item;