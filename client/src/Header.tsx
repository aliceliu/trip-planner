import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Dialog } from '@mui/material';

import { auth, User } from './firebase';
import Auth from './Auth'

function Header(props: { user: User | null }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function onLogoutClicked() {
    auth.signOut().then(function () {
      navigate('/');
    }).catch(function (error) {
      console.log(error);
    });
  }

  return <>
    <AppBar position="static">
      <Toolbar>
        <a href='/' style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }} >
          <Typography variant="h6" component="div" >
            TripPlanner
          </Typography>
        </a>
        {props.user ?
          <Button color="inherit" onClick={onLogoutClicked}>Logout</Button> :
          <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
        }
      </Toolbar>
    </AppBar >
    <Dialog onClose={() => setOpen(false)} open={open}>
      <Auth></Auth>
    </Dialog>
  </>
}

export default Header;