import React, { useState, forwardRef } from "react";
import { parseISO, format } from 'date-fns';
import showdown from 'showdown';
import parse from 'html-react-parser';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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

const converter = new showdown.Converter();

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
      <Card ref={ref} {...rest}>
        <ListItem
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

          <ListItemText
            primary={item.title}
            sx={{ whiteSpace: 'pre-wrap' }} >
          </ListItemText>
        </ListItem>
        {item.description && <Box mb={"1em"}>
          {item.description && parse(converter.makeHtml(item.description))}
        </Box>}
      </Card>
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

function formatTimeRange(startDate: Date | string, endDate: Date | string) {
  if (!startDate) {
    return '';
  }
  if (typeof startDate === 'string') {
    startDate = parseISO(startDate)
  }
  const start = format(startDate, 'HH:mm');
  let end = '';
  if (endDate) {
    if (typeof endDate === 'string') {
      endDate = parseISO(endDate)
    }
    end = ' - ' + format(endDate, 'HH:mm');
  }
  return start + end;
}

export default Item;