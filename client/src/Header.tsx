import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';


function Header() {

  return <AppBar position="static">
    <Toolbar>
      <a href='/' style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }} >
        <Typography variant="h6" component="div" >
          TripPlanner
        </Typography>
      </a>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar >
}

export default Header;