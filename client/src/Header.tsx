import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

import { User } from './firebase';

type PropType = {
  user: User | null, onLoginClicked: () => void, onLogoutClicked: () => void
}

function Header(props: PropType) {

  return <>
    <AppBar position="static">
      <Toolbar>
        <a href='/' style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }} >
          <Typography variant="h6" component="div" >
            TripPlanner
          </Typography>
        </a>
        {props.user ?
          <Button color="inherit" onClick={props.onLogoutClicked}>Logout</Button> :
          <Button color="inherit" onClick={props.onLoginClicked}>Login</Button>
        }
      </Toolbar>
    </AppBar >
  </>
}

export default Header;