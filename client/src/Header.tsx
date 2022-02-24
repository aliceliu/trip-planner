import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';


function Header() {

  const navigate = useNavigate();

  function onHeaderClicked() {
    navigate(`/`)
  }

  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={onHeaderClicked}>
        TripPlanner
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
}

export default Header;