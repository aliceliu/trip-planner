import React from "react";

import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


function ItemPopover({ id, open, anchorEl, onClose, onEditClicked, onRemoveItem }) {
  return <Popover
    id={id}
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <List>
      <ListItem onClick={onEditClicked}> Edit </ListItem>
      <ListItem onClick={onRemoveItem}> Delete </ListItem>
    </List>
  </Popover>;
}

export default ItemPopover;