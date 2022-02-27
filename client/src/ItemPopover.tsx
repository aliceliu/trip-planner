import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

type PropType = {
  id: string | undefined,
  open: boolean,
  anchorEl: any
  onClose: () => void,
  onEditClicked: () => void,
  onRemoveItem: () => void,
}

function ItemPopover(props: PropType) {

  return <Popover
    id={props.id}
    open={props.open}
    anchorEl={props.anchorEl}
    onClose={props.onClose}
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
      <ListItem onClick={props.onEditClicked}> Edit </ListItem>
      <ListItem onClick={props.onRemoveItem}> Delete </ListItem>
    </List>
  </Popover>;
}

export default ItemPopover;