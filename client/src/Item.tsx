import React, { useState, forwardRef } from "react";
import format from 'date-fns/format';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import EditItem from './EditItem';
import ItemPopover from "./ItemPopover";

export interface ModifyItemInterface {
  onRemoveItem: (listIndex: number, index: number) => void,
  onEditItem: (listIndex: number, index: number, newItem: any) => void,
}

interface ItemInterface extends ModifyItemInterface {
  listIndex: number,
  index: number,
  item: any,
}

const Item = forwardRef<any, ItemInterface>((props, ref) => {
  const { index, item, listIndex, onRemoveItem, onEditItem, ...rest } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  function closePopover() {
    setAnchorEl(null);
  };

  function onEditClicked() {
    setDialogOpen(true);
    closePopover();
  }

  function onConfirm(index: number, listIndex: number, newItem: any) {
    onEditItem(listIndex, index, newItem);
    setDialogOpen(false);
  }

  return (
    <>
      <ListItem
        ref={ref}
        {...rest}
        secondaryAction={
          <div>
            <IconButton edge="end" aria-label="more" onClick={(event: any) => setAnchorEl(event.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
            <ItemPopover
              id={open ? 'simple-popover' : undefined}
              open={open}
              anchorEl={anchorEl}
              onClose={closePopover}
              onEditClicked={onEditClicked}
              onRemoveItem={() => onRemoveItem(listIndex, index)}
            />
          </div>
        }
      >
        {item.startTime &&
          <Box
            component="small"
            mr="1em"
          >
            {formatTimeRange(item.startTime, item.endTime)}
          </Box>
        }
        <ListItemText primary={item.title} secondary={item.description} sx={{ whiteSpace: 'pre-wrap' }} />
      </ListItem>
      <EditItem
        open={dialogOpen}
        index={index}
        listIndex={listIndex}
        item={item}
        onClose={() => setDialogOpen(false)}
        onConfirm={onConfirm} />
    </>
  );
})

function formatTimeRange(startDate: Date, endDate: Date) {
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

export default Item;